import React from "react";

class SuperCounter extends React.Component {
  constructor() {
    super();
    this.state = {
      superCount: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.count !== prevProps.count) {
      this.setState({ superCount: this.props.count * 2 });
    }
  }

  render() {
    return <p>{this.state.superCount}</p>;
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
        <p>
          <SuperCounter count={this.state.count} />
        </p>
      </>
    );
  }
}
