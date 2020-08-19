/*
This solution comes from trying to get the wrappers to be totally agnostic about the ref delegation, on the basis of the previous solution.

The implicit ref delegation consists in emulating the React refs mechanism through a new special prop (innerRef in the example bellow). This way, the callback can flow transparently through the wrappers leaving the responsibility to finally set the ref to the component itself:
*/
import React, { Component } from "react";

class CustomComponent extends Component {
  constructor(props) {
    super(props);
    this.innerRef = props.innerRef || (() => null);
  }

  componentDidMount = () => {
    this.innerRef(this);
  };

  componentWillUnmount = () => {
    this.innerRef(null);
  };

  apiMethod() {
    /* ... */
  }
}

const StyledCustomComponent = (props) => (
  <CustomComponent {...props} style={{ padding: 10 }} />
);

const EnhancedCustomComponent = (props) => (
  <StyledCustomComponent {...props} extraInfo={info} />
);

class ParentComponent extends Component {
  handleClick = () => this.component.apiMethod();

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>call api method!</button>
        <EnhancedCustomComponent innerRef={(r) => (this.component = r)} />
      </div>
    );
  }
}
/*
This way, we only have to adapt the component itself to allow the use of its API methods. No boilerplate, easy maintenance and no problem dealing with external libraries (as long as they let the props pass to the wrapped component
*/
