// Context is helpful for passing props down multiple levels of child components from a parent component

// Here is the previous example rewritten with Context
// First we create context, where we can pass in default values
const UserContext = React.createContext();
// we call this 'UserContext' because that's what data we're passing down

function App() {
  // we want to pass user data down to Header
  const [user] = React.useState({ name: "Fred" });

  return (
    {/* we wrap the parent component with the provider property */}
    {/* we pass data down the computer tree with value prop */}
    <UserContext.Provider value={user}>
      <Main />
    </UserContext.Provider>
  );
}

const Main = () => (
  <>
    <Header />
    <div>Main app content...</div>
  </>
);

// we can remove the two 'user' props, we can just use consumer
// to consume the data where we need it
const Header = () => (
  {/* we use this pattern called render props to get access to the data*/}
  <UserContext.Consumer>
    {user => <header>Welcome, {user.name}!</header>}
  </UserContext.Consumer>
);