import React from "react";

import Page from "./Page";
import { SiteMap } from "../Routes";
import Link7urtle from "../components/Link7urtle";

/**
 * Application sub page component
 * @returns {JSX}
 */
const SubPage = () => {
  return (
    <Page>
      <p>
        This is SubPage
        <br />
        <Link7urtle page={SiteMap.HomePage} />
        <br />
        <Link7urtle to="/" description="to home">
          <button>Go Home</button>
        </Link7urtle>
      </p>
    </Page>
  );
};

export default SubPage;
