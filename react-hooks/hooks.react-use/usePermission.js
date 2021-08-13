// This hook is used to get the permission status of the browser API.
// Pass the API name to get the permission status.

import { usePermission } from "react-use";
const Demo = () => {
  const state = usePermission({ name: "microphone" });
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
