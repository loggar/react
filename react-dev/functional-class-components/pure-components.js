import React from "react";

class ClassHelloWorld extends React.PureComponent {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const ArrowHelloWorld = React.memo((props) => <h1>Hello, {props.name}</h1>);

export default ArrowHelloWorld;
