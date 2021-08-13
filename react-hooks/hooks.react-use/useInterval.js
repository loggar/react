// This hook to use for interval-related functionalities
// which handles clearInterval on component unmount automatically.
// It also allows pausing the interval by setting the delay to null.

import * as React from "react";
import { useInterval } from "react-use";
const Demo = () => {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(1000);
  const [isRunning, toggleIsRunning] = useBoolean(true);
  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );
  return (
    <div>
      <div>
        delay:{" "}
        <input
          value={delay}
          onChange={(event) => setDelay(Number(event.target.value))}
        />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={toggleIsRunning}>
          {isRunning ? "stop" : "start"}
        </button>
      </div>
    </div>
  );
};
