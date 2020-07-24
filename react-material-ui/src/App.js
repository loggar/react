import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";

import SimpleList from "./list/SimpleList";
import CheckboxList from "./list/CheckboxList1";
import CheckboxListSecondary from "./list/CheckboxList2";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
      <Box my={4} border="1px solid #bbb" padding="10px">
        <Typography variant="h5" component="h2" gutterBottom>
          Simple List
        </Typography>
        <SimpleList />
      </Box>
      <Box my={4} border="1px solid #bbb" padding="10px">
        <Typography variant="h5" component="h2" gutterBottom>
          Checkbox List 1
        </Typography>
        <CheckboxList />
      </Box>
      <Box my={4} border="1px solid #bbb" padding="10px">
        <Typography variant="h5" component="h2" gutterBottom>
          Checkbox List 2
        </Typography>
        <CheckboxListSecondary />
      </Box>
    </Container>
  );
}
