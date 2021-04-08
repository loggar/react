import React from "react";
const myContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "John Doe" };
  }
  render() {
    return (
      <myContext.Provider value={{ ...this.state }}>
        <ChildComponent />
      </myContext.Provider>
    );
  }
}
