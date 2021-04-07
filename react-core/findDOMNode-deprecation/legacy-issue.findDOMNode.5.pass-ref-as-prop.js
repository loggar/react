// For example, injectOffset HOC is used by the Dropdown component. It receives as props both the offsetParent and the domNodeRef and attaches the latter to the corresponding div element:

import React, { useState } from "react";
import Popover from "./popover";
import injectOffset from "./inject-offset";

const Dropdown = ({ children, content, style, offsetParent, domNodeRef }) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={style} ref={domNodeRef} onClick={handleClick}>
        {children}
      </div>
      {visible && (
        <Popover
          visible={visible}
          position={{
            top: offsetParent.offsetTop,
            left: offsetParent.offsetLeft,
          }}
        >
          {content}
        </Popover>
      )}
    </>
  );
};

export default injectOffset(Dropdown);
