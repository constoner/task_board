import React from "react";
import { CssBaseline } from '@mui/material';
import { Panel } from "./Panel/Panel";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from "./Logo/Logo";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const boards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {

  return (
    <>
      <CssBaseline />
      <Panel className="panel" id="boards">
        <AppBar classes="header" position="sticky" sx={{py: [2, 3], bgcolor: "primary.light"}}>
          <Toolbar>
            <Logo />
            <Typography variant="h4" component="h1">Task Board</Typography>
          </Toolbar>
        </AppBar>
        <main className="panel__main">
          <Container>
            <Grid container columns={{ xs: 1, sm: 2, md: 4 }} spacing={[2, 3]} sx={{py: [2, 3]}}>
              {boards.length ? boards.map((board) => {
                return (
                  <Grid item width={["100%", "50%", "25%"]} key={`board_${board}`}>
                    <Paper>
                      <Card>
                        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: ["row", "row", "column"]}}>
                        <CardContent>
                          <Typography variant="h2" sx={{fontSize: 18}}>{`Board ${board}`}</Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent: "flex-end"}}>
                          <Button variant="outlined">Open</Button>
                          <Button variant="outlined">Delete</Button>
                        </CardActions>
                        </Box>
                      </Card>
                    </Paper>
                  </Grid>
                  );
              }) : null}
            </Grid>
          </Container>
        </main>
        <footer className="panel__footer">
          <Toolbar color="secondary" sx={{bgcolor: "primary.light", py: [2, 3]}}>
            <Button variant="contained" sx={{mx: ["auto", 0],}}>Add new board</Button>
          </Toolbar>
        </footer>
      </Panel>
    </>
  );
};

export default App;
