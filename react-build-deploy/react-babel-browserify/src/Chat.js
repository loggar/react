var React = require('react');

var ChatMessage = require('./ChatMessage');

class Chat {
	getInitialState() {
		return {
			text: '',
			messages: []
		};
	}

	submit(ev) {
		ev.preventDefault();

		var newMessage = <ChatMessage message={this.state.text} />;

		this.setState({
			messages: this.state.messages.concat([newMessage]),
			text: ''
		});
	}

	updateInput(ev) {
		this.setState({
			text: ev.target.value
		});
	}

	render() {
		return <div>
			<div>{this.state.messages}</div>
			<form onSubmit={this.submit}>
				<input onChange={this.updateInput} value={this.state.text} type="text" placeholder="Your message" />
				<input type="submit" value="Send" />
			</form>
		</div>;
	}
};

module.exports = Chat;