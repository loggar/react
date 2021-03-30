// By default, you may not use the ref attribute on function components because they don’t have instances:

function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return <MyFunctionComponent ref={this.textInput} />;
  }
}

// If you want to allow people to take a ref to your function component, you can use forwardRef (possibly in conjunction with useImperativeHandle), or you can convert the component to a class.
