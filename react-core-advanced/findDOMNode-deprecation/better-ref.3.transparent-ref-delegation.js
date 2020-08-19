/*
The most common solutions to this problem are based on adapting the wrappers to ensure the access to the component’s API:

Transparent ref delegation: The wrapper proxifies the component’s API exposing methods that just delegate the implementation to the wrapped component.
*/
import React, { Component } from "react";

class CustomComponent extends Component {
  apiMethod() {
    /* ... */
  }
}

class StyledCustomComponent extends Component {
  apiMethod() {
    this.wrappedComponent.apiMethod();
  }

  render() {
    return (
      <CustomComponent
        ref={(r) => (this.wrappedComponent = r)}
        {...props}
        style={{ padding: 10 }}
      />
    );
  }
}

class EnhancedCustomComponent extends Component {
  apiMethod() {
    this.wrappedComponent.apiMethod();
  }

  render() {
    return (
      <StyledCustomComponent
        ref={(r) => (this.wrappedComponent = r)}
        {...props}
        extraInfo={info}
      />
    );
  }
}

class ParentComponent extends Component {
  handleClick = () => this.component.apiMethod();

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>call api method!</button>
        <EnhancedCustomComponent ref={(r) => (this.component = r)} />
      </div>
    );
  }
}
