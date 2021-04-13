// 1. You don’t have to refactor a functional component into a class component when it grows
// 2. You don’t have to worry about “this” anymore

export function ShowCount(props) {
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(props.count);
  }, [props.count]);

  return (
    <div>
      <h1> Count : {count} </h1>
    </div>
  );
}
