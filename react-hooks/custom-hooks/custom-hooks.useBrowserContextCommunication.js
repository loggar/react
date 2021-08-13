import useBrowserContextCommunication from "react-window-communication-hook";

function Component() {
  const [communicationState, postMessage] = useBrowserContextCommunication(
    "politicsChannel"
  );

  return <div></div>;
}
