export class ShowCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    this.setState({
      count: this.props.count,
    });
  }
  render() {
    return (
      <div>
        <h1> Count : {this.state.count} </h1>
      </div>
    );
  }
}
