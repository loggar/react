function App() {
  const [developer, setDeveloper] = React.useState({
    language: "",
    yearsExperience: 0,
    isEmployed: false,
  });

  function handleToggleEmployment(event) {
    // we get the previous state variable's value in the parameters
    // we can name 'prevState' however we like
    setDeveloper((prevState) => {
      return { ...prevState, isEmployed: !prevState.isEmployed };
      // it is essential to return the new state from this function
    });
  }

  return (
    <button onClick={handleToggleEmployment}>Toggle Employment Status</button>
  );
}
