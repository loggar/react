// This hook is used to get the previous state.
// We might not require to write custom logic to get the previous state.

import { usePrevious } from "react-use";
const Demo = () => {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);
  return (
    <p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>
        Now: {count}, before: {prevCount}
      </p>
    </p>
  );
};
