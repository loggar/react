import React from "react";
const myContext = React.createContext();

class GrandChildComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <myContext.Consumer>
        {(context) => <h1> {context.name} </h1>}
      </myContext.Consumer>
    );
  }
}
