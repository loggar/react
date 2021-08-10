// The solution that we finally chose is to create a ref in the HOC but passing it through its wrapped component via props (domNodeRef in the example). Then, the final component will have the responsibility to attach it to an actual DOM element.

import React, { Component, createRef } from "react";
import { equals } from "ramda";

const injectOffset = (WrappedComponent) =>
  class ComponentWrapper extends Component {
    state = {
      offsetParent: {
        offsetLeft: 0,
        offsetTop: 0,
      },
    };

    domNodeRef = createRef();

    componentDidMount() {
      this.updateProps();
    }

    componentDidUpdate() {
      this.updateProps();
    }

    updateProps = () => {
      if (this.domNodeRef.current) {
        const element = this.domNodeRef.current;
        const offsetParent = {
          offsetLeft: element.offsetLeft,
          offsetTop: element.offsetTop,
        };
        if (!equals(offsetParent, this.state.offsetParent)) {
          this.setState({ offsetParent });
        }
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          offsetParent={this.state.offsetParent}
          domNodeRef={this.domNodeRef}
        />
      );
    }
  };

export default injectOffset;
