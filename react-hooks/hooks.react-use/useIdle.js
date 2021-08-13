// The useIdle hook tracks if the user on the page is idle.
// You can pass two params - one is time to consider idle and initialState, which allows the setting user is idle initially.

import { useIdle } from "react-use";
const Demo = () => {
  const isIdle = useIdle(3e3);
  return (
    <div>
      <div>User is idle: {isIdle ? "Yes" : "No"}</div>
    </div>
  );
};
