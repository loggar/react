import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.inputRef = null;
  }

  render() {
    return (
      <>
        <input
          ref={(inputRef) => {
            this.inputRef = inputRef;
          }}
        />
        <button onClick={() => this.inputRef.focus()}>focus input</button>
      </>
    );
  }
}
