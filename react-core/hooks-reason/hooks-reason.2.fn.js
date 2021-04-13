// 3. No more method bindings
// 4. Easier to decouple logic from UI, making both more reusable

export function ShowCount(props) {
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(props.count);
  }, [props.count]);

  function handleClickEvent() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1 onClick={handleClickEvent}> Count : {count} </h1>
    </div>
  );
}
