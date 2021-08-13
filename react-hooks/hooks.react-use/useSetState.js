// This hook is used to merge objects into their current state, similar to the this.setState in the class component.
// If you are using multiple states, it can be brought down to a single object state using useSetState

import { useSetState } from "react-use";
const Demo = () => {
  const [state, setState] = useSetState({});
  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ hello: "world" })}>hello</button>
      <button onClick={() => setState({ foo: "bar" })}>foo</button>
      <button
        onClick={() => {
          setState((prevState) => ({
            count: (prevState.count || 0) + 1,
          }));
        }}
      >
        count
      </button>
    </div>
  );
};
