var React = require('react');

class ChatMessage {
	render() {
		return <p>{this.props.message}</p>;
	}
};

module.exports = ChatMessage;