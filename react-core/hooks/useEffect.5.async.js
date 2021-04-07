// Note that handling promises with the more concise async/await syntax requires creating a separate function (Why? The effect callback function cannot be async)

const endpoint = "https://api.1";

// with promises:
function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // promises work in callback
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);
}

// with async / await syntax for promise:
function App() {
  const [user, setUser] = React.useState(null);
  // cannot make useEffect callback function async
  React.useEffect(() => {
    getUser();
  }, []);

  // instead, use async / await in separate function, then call
  // function back in useEffect
  async function getUser() {
    const response = await fetch("https://api.2");
    const data = await response.json();
    setUser(data);
  }
}
