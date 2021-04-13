export class ShowCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }
  componentDidMount() {
    this.setState({
      count: this.props.count,
    });
  }

  handleClickEvent() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleClickEvent}> Count : {this.state.count} </h1>
      </div>
    );
  }
}
