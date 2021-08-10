// 5. Keep related logic in the same place
// You can see that inside the useEffect we have included subscribing as well as corresponding unsubscribing logic.

import { getCounts } from "./hooks-reason.3.reactive-service";

export function ShowCount(props) {
  const [count, setCount] = useState();

  useEffect(() => {
    const countServiceSubject = getCounts();
    countServiceSubject.subscribe((count) => {
      setCount(count);
    });
    return () => {
      countServiceSubject.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1> Count : {count} </h1>
    </div>
  );
}
