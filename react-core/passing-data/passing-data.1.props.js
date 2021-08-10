function Home() {
  return (
    <div>
      //passing name prop to greeting component
      <Greeting name="Tripp" />
    </div>
  );
}

function Greeting(props) {
  return (
    <div>
      //using prop passed down
      <p>Hi there {props.name}</p>
    </div>
  );
}
