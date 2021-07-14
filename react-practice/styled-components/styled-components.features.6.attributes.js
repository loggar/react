const Input = styled.input`
  font-size: 14px;
  padding: 2px 5px;
  border: 1px solid green;
`;

/*
Input will render and input element. Input elements have different types, including:

text
number
password
email
*/

const Input = styled.input.attrs({
  type: "text",
})`
  font-size: 14px;
  padding: 2px 5px;
  border: 1px solid green;
`;

// This will create an input element with type text. We can also add other attributes to styled components.

const Input = styled.input.attrs({
  type: "text",
  placeholder: "Type anything here...",
})`
  font-size: 14px;
  padding: 2px 5px;
  border: 1px solid green;
`;

const PasswordInput = styled.input.attrs({
  type: "password",
  placeholder: "Type your password here...",
})`
  font-size: 14px;
  padding: 2px 5px;
  border: 1px solid green;
`;
