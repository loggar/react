// This hook is used to get the network status of the browser.
// useNetworkState can be used the show the connection status to the user.

import { useNetworkState } from "react-use";
const Demo = () => {
  const state = useNetworkState();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
