import React, { useState } from "react";
import HelloWorld from "./mounting.class";

const App = () => {
  const [name, setName] = useState("🐢");
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && <HelloWorld name={name} />}
      <button onClick={() => setName("🐛")}>Change name</button>
      <button onClick={() => setVisible(false)}>Make invisible</button>
    </>
  );
};

export default App;
