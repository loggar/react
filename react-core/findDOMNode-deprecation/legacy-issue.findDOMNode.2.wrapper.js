// Adding a DOM node wrapper

// The simplest solution to this type of scenario is to wrap your component with a DOM element that you can actually attach a ref to it. For example:

import React, { createRef, Component } from "react";
import ChildComponent from "./child-component";

class MyComponent extends Component {
  componentDidMount() {
    const node = this.wrapper.current;
    /* Uses DOM node  */
  }

  wrapper = createRef();

  render() {
    return (
      <div ref={this.wrapper}>
        <ChildComponent>{this.props.children}</ChildComponent>
      </div>
    );
  }
}

export default MyComponent;

// The drawback of this solution is that it can get very tricky when you’re migrating a large application. For example, having many nested components positioned relative to each other can lead you to a CSS nightmare.
