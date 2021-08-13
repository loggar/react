// This hook is used to toggle between two states like TRUE, FALSE.
// This approach reduces the manual logic.

import { useToggle } from "react-use";
const Demo = () => {
  const [on, toggle] = useToggle(true);
  return (
    <div>
      <div>{on ? "ON" : "OFF"}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => toggle(true)}>set ON</button>
      <button onClick={() => toggle(false)}>set OFF</button>
    </div>
  );
};
