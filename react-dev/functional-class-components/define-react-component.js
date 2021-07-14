import React from "react";

// class
class ClassHelloWorld extends React.Component {
  render() {
    return <h1>Hello, World</h1>;
  }
}

// function
const FunctionHelloWorld = function () {
  return <h1>Hello, World</h1>;
};

// arrow function
const ArrowHelloWorld = () => <h1>Hello, World</h1>;

export default FunctionHelloWorld;
