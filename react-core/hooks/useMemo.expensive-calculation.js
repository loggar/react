// useMemo is very similar to useCallback and is for improving performance, but instead of being for callbacks, it is for storing the results of expensive calculations
// useMemo allows us to 'memoize', or remember the result of expensive calculations when they have already been made for certain inputs (we already did it once for these values, so no new to do it again)
// useMemo returns a value from the computation, not a callback function (but can be a function)

// useMemo is useful when we need a lot of computing resources
// to perform an operation, but don't want to repeat it on each re-render

function App() {
  // state to select a word in 'words' array below
  const [wordIndex, setWordIndex] = useState(0);
  // state for counter
  const [count, setCount] = useState(0);

  // words we'll use to calculate letter count
  const words = ["i", "am", "learning", "react"];
  const word = words[wordIndex];

  function getLetterCount(word) {
    // we mimic expensive calculation with a very long (unnecessary) loop
    let i = 0;
    while (i < 1000000) i++;
    return word.length;
  }

  // Memoize expensive function to return previous value if input was the same
  // only perform calculation if new word without a cached value
  const letterCount = React.useMemo(() => getLetterCount(word), [word]);

  // if calculation was done without useMemo, like so:

  // const letterCount = getLetterCount(word);

  // there would be a delay in updating the counter
  // we would have to wait for the expensive function to finish

  function handleChangeIndex() {
    // flip from one word in the array to the next
    const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
    setWordIndex(next);
  }

  return (
    <div>
      <p>
        {word} has {letterCount} letters
      </p>
      <button onClick={handleChangeIndex}>Next word</button>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
