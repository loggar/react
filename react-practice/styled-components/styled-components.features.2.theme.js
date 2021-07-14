// Theming

import { ThemeProvider } from "styled-components";

const theme = {
  boderColor: "green",
  color: "green",
  bgColor: "green",
};

const Button = styled.button`
  padding: 2px 5px;
  color: ${(props) => props.theme.color};
  border-radius: 3px;
`;

const Div = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

/*
<ThemeProvider theme={theme}>
    <Div>
        <Button>Click Me</Button>
    </Div>
</ThemeProvider>
*/
