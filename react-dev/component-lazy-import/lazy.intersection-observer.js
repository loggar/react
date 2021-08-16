// IntersectionObserver lets us know if the target element is in the viewport or not.
// We can safely assume that if the IntersectionObserver fires, the target element is in the viewport.
// We can leverage this and lazily load any component when it is in the viewport.

import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  const { ref, inView } = useInView({
    threshold: 0.0,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div ref={ref}>{inView && <HeavyComponent />}</div>
    </Suspense>
  );
}

// react-intersection-observer gives us useInView hook, which gives us a ref and inView flag.
// The ref should be attached to the target element and inView lets us know if the target element is in the viewport.
// The threshold option is a value between 0 and 1 indicating the percentage of element that should be visible before triggering.
// Now, <HeavyComponent /> would only be downloaded when it is in the viewport.
