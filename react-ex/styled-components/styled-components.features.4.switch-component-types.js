const Button = styled.button`
  padding: 2px 5px;
  color: ${(props) => props.theme.color};
  border-radius: 3px;
`;

/*
<Button as="a">Click Me</Button>
*/
// This will create and render an anchor element. The as="a" changes it from rendering a button element to rendering an anchor element.

// This can also be done using the withComponent method.
const Button = styled.button`
  padding: 2px 5px;
  color: palevioletred;
  border-radius: 3px;
`;

const Link = Button.withComponent("a");
