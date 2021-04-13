import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    const timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return <>{this.state.date.toString()}</>;
  }
}
