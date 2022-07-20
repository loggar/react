// Styled Components
// npm install --save styled-components

import styled from "styled-components";
// Create a button variable and add CSS
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid red;
  color: red;
`;
//display the HTML
render(
  <div>
    <Button>Button</Button>
  </div>
);
