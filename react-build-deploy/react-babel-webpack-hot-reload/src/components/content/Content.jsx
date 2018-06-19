// Dependencies
import React from 'react';

// Styles
import './Content.scss';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			input: 'this is a input text',
		};
	}
	handleInputChange(e) {
		this.setState({ input: e.target.value });
	}
	render() {
		return (
			<div className="content">
				<input type="text" value={this.state.input} onChange={this.handleInputChange} />
				<span>Hey 22<br /> {this.state.input}</span>
			</div>
		);
	}
}

export default Content;