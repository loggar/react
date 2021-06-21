import React from "react";
import { Route, Switch } from "react-router-dom";

import Page404 from "./404Page";
import HomePage from "./HomePage";
import SubPage from "./SubPage";

export const siteMap = {
  HomePage: {
    title: "Home",
    path: "/",
    description: "My home page",
  },
  SubPage: {
    title: "Sub Page",
    path: "/sub-page",
    description: "My sub page",
  },
};

/**
 * Routes component containing routes for the whole application
 * @returns {JSX}
 */
const Routes = () => (
  <Switch>
    <Route exact path={siteMap.HomePage.path} component={HomePage} />
    <Route exact path={siteMap.SubPage.path} component={SubPage} />

    <Route component={Page404} />
  </Switch>
);

export default Routes;
