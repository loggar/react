// The useContext hook can remove this unusual-looking render props pattern, however to be able to consume context in whatever function component we like

const Header = () => {
  // we pass in the entire context object to consume it
  const user = React.useContext(UserContext);
  // and we can remove the Consumer tags
  return <header>Welcome, {user.name}!</header>;
};
