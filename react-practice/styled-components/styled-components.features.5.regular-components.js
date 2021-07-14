function Button(props) {
  return <button className={props.className}>{props.children}</button>;
}

Button = styled(Button)`
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid palevioletred;
`;
