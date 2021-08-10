import useClippy from "use-clippy";

function Component() {
  const [clipboard, setClipboard] = useClipy();

  return (
    <div>
      <div>Clipboard</div>
      <div>{clipboard}</div>

      <button onClick={() => setClipboard("nnamdi")}>Set Clipboard</button>
    </div>
  );
}
