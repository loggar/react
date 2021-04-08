import React, { useRef } from "react";

export default function App() {
  const inputRef = useRef();
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>focus input</button>
    </>
  );
}
