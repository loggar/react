import { useState, useEffect } from "react";

const Delayed = ({ children, waitBeforeShow = 100 }) => {
  const [isRenderDelayed, setIsRenderDelayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRenderDelayed(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isRenderDelayed ? children : null;
};

export default Delayed;
