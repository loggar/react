// npm i -D react-router-dom
// Because I prefer functional programming, I am also using my @7urtle/lambda library from 7urtle to make my code more elegant. You can either rewrite those examples or install the library with:
// npm i -D @7urtle/lambda

import React from "react";
import { Route, Switch } from "react-router-dom";
import Page404 from "./404Page";
import HomePage from "./HomePage";
import SubPage from "./SubPage";

/**
 * Routes component containing routes for the whole application
 * @returns {JSX}
 */
const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/sub-page" component={SubPage} />

    <Route component={Page404} />
  </Switch>
);

export default Routes;
