// This hook is used to listen to the scroll event of the element and re-renders on scrolling.
// No required to add the JavaScript event listeners manually.

import { useScroll } from "react-use";
const Demo = () => {
  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);
  return (
    <div ref={scrollRef}>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};
