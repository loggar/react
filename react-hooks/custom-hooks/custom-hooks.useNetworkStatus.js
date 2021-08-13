import useNetworkStatus from "@rehooks/network-status";

function Component() {
  const connection = useNetworkStatus();
  const { effectiveType, saveData, rtt, downlink } = connection;

  return (
    <div>
      <div>Network: {connection.effectiveType ? "Fast" : "Slow"}</div>
      <div>Data Saver Mode: {saveData ? "Yes" : "No"}</div>
    </div>
  );
}
