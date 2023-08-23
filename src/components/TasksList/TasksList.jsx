// React
import { useContext } from "react";
import Context from "../App/context";
import * as backend from "../../data/utils";
import PropTypes from "prop-types";

// MUI components
import List from "@mui/material/List";

// Custom components
import EditableName from "../EditableName/EditableName";
import NewTask from "./NewTask";

const TasksList = ({ taskData, cardID, status, setStatus }) => {
  const { tasks, setTasks, addTask, removeTask } = useContext(Context);

  const createTask = (cardID) => {
    backend
      .pushTask(cardID)
      .then((doc) => addTask(doc))
      .catch(console.error);
  };

  const deleteTask = (dataID, cb) => {
    cb(true);
    backend
      .eraseTask(dataID)
      .then(() => removeTask(dataID, cb))
      .catch(console.error);
  };

  return (
    <List
      sx={{
        width: "100%",
        "& ul": { padding: 0 },
      }}
    >
      {taskData.map(({ id, data }) => {
        return (
          <li key={id}>
            <EditableName
              id={id}
              name={data.name}
              collection="tasks"
              cb={deleteTask}
              isInputBusy={status}
              setInputState={setStatus}
              names={tasks}
              setNames={setTasks}
            />
          </li>
        );
      })}

      {/* Add new task */}
      <li key="add">
        <NewTask onClick={() => createTask(cardID)} />
      </li>
    </List>
  );
};

export default TasksList;

TasksList.propTypes = {
  taskData: PropTypes.arrayOf(PropTypes.object).isRequired,
  cardID: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  setStatus: PropTypes.func.isRequired,
};
