// The dependencies array is the second argument and if any one of the values in the array changes, the effect function runs again

function App() {
  const [colorIndex, setColorIndex] = React.useState(0);
  const colors = ["blue", "green", "red", "orange"];

  // we add colorIndex to our dependencies array
  // when colorIndex changes, useEffect will execute the effect fn again
  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
    // when we use useEffect, we must think about what state values
    // we want our side effect to sync with
  }, [colorIndex]);

  function handleChangeIndex() {
    const next = colorIndex + 1 === colors.length ? 0 : colorIndex + 1;
    setColorIndex(next);
  }

  return <button onClick={handleChangeIndex}>Change background color</button>;
}
