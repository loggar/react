/*
So far, this approach is enough to deal with simple React components but, what would happen if the <CustomComponent /> needed to be wrapped?
*/
import React, { Component } from "react";

class CustomComponent extends Component {
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
        <EnhancedCustomComponent ref={(r) => (this.component = r)} />
      </div>
    );
  }
}
/*
ref is a special attribute so it won’t be passed through to the wrapped component as the rest of the props. We just lost the ref to the <CustomComponent /> so we cannot access its API anymore.
*/
