/*
Explicit ref delegation: The wrapper component is in charge of setting the ref attribute to the inner component with the callback received in a known prop, in the following example componentRef.
*/
import React, { Component } from "react";

class CustomComponent extends Component {
  apiMethod() {
    /* ... */
  }
}

const StyledCustomComponent = (props) => (
  <CustomComponent
    ref={props.componentRef}
    {...props}
    style={{ padding: 10 }}
  />
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
        <EnhancedCustomComponent componentRef={(r) => (this.component = r)} />
      </div>
    );
  }
}
/*
Although this solution requires much less boilerplate code than the previous one, it still requires the adaptation of its closest wrapper. The wrapper adaptation involves two main problems:

- Code maintenance: Both component and wrapper are coupled, which means that if a new wrapper is added, the old closest wrapper and the new one must be adapted.
- External libraries: If the closest wrapper of the component belongs to an external library, we cannot adapt it without keeping a local modified copy of the library.
*/
