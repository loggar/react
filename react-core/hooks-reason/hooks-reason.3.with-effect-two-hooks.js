// 5. Keep related logic in the same place
// Similarly, if we need to introduce more service subscriptions or unrelated logics, we can add multiple useEffect blocks to logically separate different concerns.

import { getCounts } from "./hooks-reason.3.reactive-service";

export function ShowCount(props) {
  const [count, setCount] = useState();
  const [secondCount, setSecondCount] = useState(0);

  useEffect(() => {
    const countServiceSubject = getCounts();
    countServiceSubject.subscribe((count) => {
      setCount(count);
    });
    return () => {
      countServiceSubject.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setSecondCount(secondCount + 1);
  }, []);

  return (
    <div>
      <h1> Count : {count} </h1>
      <h1> Second Count: {secondCount} </h1>
    </div>
  );
}