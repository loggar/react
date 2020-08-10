// Before
class ExampleComponent extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({
      currentColor: this.props.defaultColor,
      palette: "rgb",
    });
  }
}

// After
class ExampleComponent extends React.Component {
  state = {
    currentColor: this.props.defaultColor,
    palette: "rgb",
  };
}
