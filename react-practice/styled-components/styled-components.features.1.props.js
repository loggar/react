import styled from "styled-components";

// Style inheritance
const Div = styled.div`
  padding: 10px;
  color: palevioletred;
`;

const InheritedDiv = styled(Div)`
  border: 1px solid palevioletred;
`;

// Passing props
const Button = styled.button`
  padding: 2px 5px;
  color: white;
  border-radius: 3px;
`;

const Div = styled.div`
  padding: 10px;
  color: palevioletred;
  border: 1px solid palevioletred;
`;

/*
<Button color="black">Click Me</Button>
<Div borderColor="green"></Div>
*/

const Button = styled.button`
  padding: 2px 5px;
  color: ${(props) => (props.color ? props.color : "white")};
  border-radius: 3px;
`;

const Div = styled.div`
  padding: 10px;
  color: palevioletred;
  border: 1px solid
    ${(props) => (props.borderColor ? props.borderColor : "palevioletred")};
`;
