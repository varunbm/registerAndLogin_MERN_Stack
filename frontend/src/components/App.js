import React from "react";
import { Route, Switch } from "react-router-dom";
import aboutComponent from "./aboutComponent";
import homeComponent from "./homeComponent";
import loginComponent from "./loginPageComponent";
import registerComponent from "./registerComponent";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="lg">
      <Switch>
        <Route path="/" exact component={homeComponent} />
        <Route path="/about" component={aboutComponent} />
        <Route path="/login" component={loginComponent} />
        <Route path="/register" component={registerComponent} />
      </Switch>
    </Container>
    /* <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Value
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              value
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
      </div>
    </Container> */
  );
}

export default App;
