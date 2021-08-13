// This hook is used to get the user geolocation.
// useGeolocation returns latitude, longitude, altitude, and more info.

import { useGeolocation } from "react-use";
const Demo = () => {
  const state = useGeolocation();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
