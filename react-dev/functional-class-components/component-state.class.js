import React from "react";

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "🐢",
    };
  }

  render() {
    return (
      <>
        <h1>Hello, {this.state.name}!</h1>
        <input
          onChange={(event) =>
            this.setState({ name: event.currentTarget.value })
          }
        />
      </>
    );
  }
}

export default HelloWorld;
