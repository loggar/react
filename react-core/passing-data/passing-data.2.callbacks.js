function Home() {
  //useState establishes state in a functional component
  let [showSecret, setShowSecret] = useState(0);
  return (
    <div>
      <Greeting name="Tripp" displaySecrete={setShowSecret} />
      {/* will show a message once state is true */}
      {showSecret ? <p>Secret: You just went Against the Flow</p> : <p></p>}
    </div>
  );
}

function Greeting(props) {
  return (
    <div>
      <p>Hi there {props.name}</p>
      {/* clicking button will update state of the parent component and show the secret in the parent component */}
      <button onClick={() => props.displaySecrete(1)}>Show Secret</button>
    </div>
  );
}
