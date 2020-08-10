// Before
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentWillMount() {
    this._asyncRequest = loadMyAsyncData().then((externalData) => {
      this._asyncRequest = null;
      this.setState({ externalData });
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }
}

// After
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentDidMount() {
    this._asyncRequest = loadMyAsyncData().then((externalData) => {
      this._asyncRequest = null;
      this.setState({ externalData });
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }
}
