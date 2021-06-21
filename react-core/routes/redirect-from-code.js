import React, { useContext, useEffect } from "react";
import { isTrue } from "@7urtle/lambda";
import { useHistory } from "react-router-dom";

import Page from "./Page";
import { StoreContext } from "../store/StoreContext";

const LoginPage = () => {
  const { state } = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    if (isTrue(state.authentication.authenticated)) {
      history.push("/sub-page");
    }
  }, [state.authentication.authenticated]);

  return (
    <Page className={classes.page}>
      <div>I am a Login Page</div>
    </Page>
  );
};

export default LoginPage;
