import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState({});

  const fetchData = async () => {
    const res = await fetch("https://api.1");
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <>{data.name}</>;
}
