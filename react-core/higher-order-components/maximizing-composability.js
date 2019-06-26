// Convention: Maximizing Composability

/*
Not all HOCs look the same. Sometimes they accept only a single argument, the wrapped component:
*/

const NavbarWithRouter = withRouter(Navbar);

/*
Usually, HOCs accept additional arguments. In this example from Relay, a config object is used to specify a component’s data dependencies:
*/

const CommentWithRelay = Relay.createContainer(Comment, config);

/*
The most common signature for HOCs looks like this:
*/

// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

/*
What?! If you break it apart, it’s easier to see what’s going on.
*/

// connect is a function that returns another function
const enhance = connect(commentListSelector, commentListActions);
// The returned function is a HOC, which returns a component that is connected
// to the Redux store
const ConnectedComment = enhance(CommentList);

/*
In other words, connect is a higher-order function that returns a higher-order component!

This form may seem confusing or unnecessary, but it has a useful property. Single-argument HOCs like the one returned by the connect function have the signature Component => Component. Functions whose output type is the same as its input type are really easy to compose together.
*/

// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
	// These are both single-argument HOCs
	withRouter,
	connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)

/*
(This same property also allows connect and other enhancer-style HOCs to be used as decorators, an experimental JavaScript proposal.)

The compose utility function is provided by many third-party libraries including lodash (as lodash.flowRight), Redux, and Ramda.
*/
