// Another solution that the React documentation recommends us is to pass a ref to your custom component and pass that along to the DOM using ref forwarding. This way it is not necessary to wrap our components or add new HTML elements.

import React, { createRef, Component } from "react";

// ChildComponent uses React.forwardRef to obtain the ref passed to it
// and then forward it to the DOM div that it renders.
const ChildComponent = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <span>{props.children}</span>
  </div>
));

class MyComponent extends Component {
  componentDidMount() {
    const node = this.childRef.current;
    /* Uses DOM node  */
  }

  childRef = createRef();

  render() {
    return (
      // Pass the created ref to ChildComponent
      <ChildComponent ref={this.childRef}>{this.props.children}</ChildComponent>
    );
  }
}

export default MyComponent;
