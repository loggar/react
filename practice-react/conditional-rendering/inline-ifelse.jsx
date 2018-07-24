class Sample extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: false };
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<div>
				The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
		  </div>
		);
	}
}

// It can also be used for larger expressions although it is less obvious what’s going on:
/*
render() {
	const isLoggedIn = this.state.isLoggedIn;
	return (
		<div>
			{isLoggedIn ? (
				<LogoutButton onClick={this.handleLogoutClick} />
			) : (
					<LoginButton onClick={this.handleLoginClick} />
			)}
		</div>
	);
}
*/
