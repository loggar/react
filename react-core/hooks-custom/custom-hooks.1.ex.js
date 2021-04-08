// Hooks were created to easily reuse behavior between components
// Hooks are a more understandable pattern than previous ones for class components, such as higher-order components or render props
// What's great is that we can create our own hooks according to our own projects' needs, aside from the ones we've covered that React provides:

// here's a custom hook that is used to fetch data from an API
function useAPI(endpoint) {
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(endpoint);
    const data = await response.json();
    setValue(data);
  }

  return value;
}

// this is a working example! try it yourself (i.e. in codesandbox.io)
function App() {
  const todos = useAPI("https://todos-dsequjaojf.now.sh/todos");

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
