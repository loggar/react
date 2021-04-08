import { useMouseAction, useMouseDown, useMouseUp } from "use-mouse-action";

function Component() {
  const mouseActionProps = useMouseAction({
    onAction: () => console.log("Mouse clicked"),
  });

  const mouseDownProps = useMouseDown(() => console.log("Mouse down"));

  const mouseUpProps = useMouseUp(() => console.log("Mouse up"));

  return (
    <>
      <button {...mouseActionProps}>Mouse Action</button>
      <button {...mouseDownProps}>Mouse Down</button>
      <button {...mouseUpProps}>Mouse Up</button>
    </>
  );
}
