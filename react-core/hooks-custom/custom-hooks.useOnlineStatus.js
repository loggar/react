import useOnlineStatus from "@rehooks/online-status";

function Component() {
  const online = useOnlineStatus();

  return <div>Network {online ? "Online" : "Offline"}</div>;
}
