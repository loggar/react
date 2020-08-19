import React, { Component } from "react";

class CustomComponent extends Component {
  apiMethod() {
    /* ... */
  }
}

class ParentComponent extends Component {
  handleClick = () => this.component.apiMethod();

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>call api method!</button>
        <CustomComponent ref={(r) => (this.component = r)} />
      </div>
    );
  }
}
/*
At mount time, the ref callback will receive the DOM element (in case you want to store an HTML element) or the mounted instance of the component (in case you want to store a custom component declared as a class).
*/
