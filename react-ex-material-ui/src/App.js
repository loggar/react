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
    <Container maxWidth="xl">
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" gutterBottom>
          List
        </Typography>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Simple List
          </Typography>
          <SimpleList />
        </Box>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Checkbox List 1
          </Typography>
          <CheckboxList />
        </Box>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Checkbox List 2
          </Typography>
          <CheckboxListSecondary />
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box width="sm" textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App v4-beta example
          </Typography>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </Container>
  );
}
