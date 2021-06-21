// npm i -D react-loadable

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import loadable from "react-loadable";

import LoadingPage from "./LoadingPage";
import Page404 from "./404Page";
import LoginPage from "./LoginPage";
import SubPage from "./SubPage";

const AsyncPages = {
  myAsyncSubPage: loadable({
    loader: () => import("./myAsyncSubPage"),
    loading: LoadingPage,
  }),
};

/**
 * Routes component containing routes for the whole application
 * @returns {JSX}
 */
const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/sub-page" component={SubPage} />
    <Route
      exact
      path="/my-async-sub-page"
      component={AsyncPages.myAsyncSubPage}
    />

    <Redirect exacts from="/" to="/login" />

    <Route component={Page404} />
  </Switch>
);

export default Routes;
