// MUI components
import List from "@mui/material/List";

// Custom components
import EditableName from "../EditableName/EditableName";
import NewTask from "./NewTask";

const TasksList = ({
  taskData,
  cardID,
  status,
  setStatus,
  addTask,
  removeTask,
  tasks,
  setTasks,
}) => {
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
              cb={removeTask}
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
        <NewTask onClick={() => addTask(cardID)} />
      </li>
    </List>
  );
};

export default TasksList;
