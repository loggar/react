// useError hook is used to dispatch errors.

import { useError } from "react-use";
const Demo = () => {
  const dispatchError = useError();
  const clickHandler = () => {
    dispatchError(new Error("Some error!"));
  };
  return <button onClick={clickHandler}>Click me to throw</button>;
};
// In parent app
const App = () => (
  <ErrorBoundary>
    <Demo />
  </ErrorBoundary>
);
