// This hook is used to delay the event until the wait time is completed.
// In the blew code the setState is performed after the wait time is completed.

const Demo = () => {
  const [state, setState] = React.useState("Typing stopped");
  const [val, setVal] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");
  const [, cancel] = useDebounce(
    () => {
      setState("Typing stopped");
      setDebouncedValue(val);
    },
    2000,
    [val]
  );
  return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState("Waiting for typing to stop...");
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>
        Debounced value: {debouncedValue}
        <button onClick={cancel}>Cancel debounce</button>
      </div>
    </div>
  );
};
