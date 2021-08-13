// 6. Sharing stateful logic between components
// Using the above custom hook, we can rewrite the ShowCount component as follows. Notice that we have to pass the data source to the custom hook as a parameter.
// Note that we invoke getCounts in a parent component rather than in ShowCount component. Otherwise serviceSubject will have a new value each time it runs ShowCount and we wouldn’t get the result we expect.

import { useCount } from "./hooks-reason.4.use-count";

export function ShowCount(props) {
  const [count, setCount] = useCount(props.serviceSubject);

  useEffect(() => {
    setCount(-1);
  }, [setCount]);

  return (
    <div>
      <h1> Count : {count} </h1>
    </div>
  );
}
