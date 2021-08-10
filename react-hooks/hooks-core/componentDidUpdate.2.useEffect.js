import React, { useState, useEffect } from "react";

const SuperCounter = ({ count }) => {
  const [superCount, setSuperCount] = useState(0);

  useEffect(() => {
    setSuperCount(count * 2);
  }, [count]);

  return <p>{superCount}</p>;
};

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      <p>
        <SuperCounter count={count} />
      </p>
    </>
  );
}
