class CommentListContainer extends React.Component {
	state = { comments: [] };
	componentDidMount() {
		fetchSomeComments(comments =>
			this.setState({ comments: comments }));
	}
	render() {
		return <CommentList comments={this.state.comments} />;
	}
}

// This is just a placeholder for a real request
const fetchSomeComments = cb =>
	cb([
		{ author: "Chan", body: "You look nice today." },
		{ author: "You", body: "I know, right?!" }
	]);

ReactDOM.render(
	<CommentList />,
	document.getElementById("root")
);
