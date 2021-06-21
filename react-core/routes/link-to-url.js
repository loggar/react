import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Page404 from "./Page404";
import LoginPage from "./LoginPage";
import SubPage from "./SubPage";

/**
 * Routes component containing routes for the whole application
 * @returns {JSX}
 */
const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/sub-page" component={SubPage} />

    <Redirect exacts from="/" to="/login" />

    <Route component={Page404} />
  </Switch>
);

export default Routes;
