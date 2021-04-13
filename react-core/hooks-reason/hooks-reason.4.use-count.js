// 6. Sharing stateful logic between components
// With Custom React Hooks you can extract these reusable stateful logics and test them separately.

import { useState, useEffect } from "react";

export function useCount(serviceSubject) {
  const [count, setCount] = useState();

  useEffect(() => {
    serviceSubject.subscribe((count) => {
      setCount(count);
    });
    return () => {
      serviceSubject.unsubscribe();
    };
  }, [serviceSubject]);

  return [count, setCount];
}
