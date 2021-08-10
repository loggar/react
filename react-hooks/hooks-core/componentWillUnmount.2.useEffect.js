import React, { useState, useEffect } from "react";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [timer, setTimer] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    setTimer(timer);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{date.toString()}</>;
}
