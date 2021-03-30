import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChildComponent from "./child-component";

class MyComponent extends Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    /* Uses DOM node  */
  }

  render() {
    return <ChildComponent>{this.props.children}</ChildComponent>;
  }
}

export default MyComponent;

// Using findDOMNode this was not a problem. You could pass directly this or add a ref to any React component to retrieve the corresponding DOM element:

// So let’s go over the different solutions we have come across while trying to get rid of our findDOMNode usages.
