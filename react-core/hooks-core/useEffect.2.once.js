// To avoid executing the effect callback after each render, we provide a second argument, an empty array
function App() {
  // ...
  // now our button doesn't work no matter how many times we click it...
  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
  }, []);
  // the background color is only set once, upon mount

  // how do we not have the effect function run for every state update...
  // but still have it work whenever the button is clicked?

  return <button onClick={handleChangeIndex}>Change background color</button>;
}
