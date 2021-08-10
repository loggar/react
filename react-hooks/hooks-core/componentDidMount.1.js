import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    const res = await fetch("https://api.1");
    const data = await res.json();
    this.setState({ data });
  }

  render() {
    return (
      <>
        <p>{this.state.data.name}</p>
      </>
    );
  }
}
