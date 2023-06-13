import React from "react";
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const boards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const boards = [1, ];
// const boards = [];

const App = () => {

  return (
    <>
      <CssBaseline />
      <Box id="boards" sx={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <AppBar position="sticky" sx={{py: [2, 3], bgcolor: "primary.light"}}>
          <Toolbar>
            <Box sx={{mr: 2, '& img': {display: "block"}}}>
              <img width="32" height="32" src="./img/logo.png" alt="The Logo of the Task Board App." />
            </Box>
          <Typography variant="h4" component="h1">Task Board</Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{flexGrow: 1, overflow: "auto"}}>
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
        </Box>
        <Box component="footer" sx={{boxShadow: "0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)"}}>
          <Toolbar color="secondary" sx={{bgcolor: "primary.light", py: [2, 3]}}>
            <Button variant="contained" sx={{mx: ["auto", 0],}}>Add new board</Button>
          </Toolbar>
        </Box>
      </Box>
    </>
  );
};

export default App;
