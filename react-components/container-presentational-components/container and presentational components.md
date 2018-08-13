# Container and Presentational Components

> A container does data fetching and then renders its corresponding sub-component. That’s it.

## Why containers?

Say you have a component that displays comments. You didn’t know about container components. So, you put everything in one place:

```jsx
class CommentList extends React.Component {
  this.state = { comments: [] };

  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return (
      <ul>
        {this.state.comments.map(c => (
          <li>{c.body}—{c.author}</li>
        ))}
      </ul>
    );
  }
}
```

Your component is responsible for both fetching data and presenting it. There’s nothing “wrong” with this but you miss out on a few benefits of React.

### Reusability
CommentList can’t be reused unless under the exact same circumstances.

### Data structure
Your markup components should state expectations of the data they require. PropTypes are great for this.

Our component is opinionated about data structure but has no way of expressing those opinions. This component will break silently if the json endpoint change.

## with a container

```jsx
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
```

```jsx
const CommentList = props =>
  <ul>
    {props.comments.map(c => (
      <li>{c.body}—{c.author}</li>
    ))}
  </ul>
```

### what did we get?

* We’ve separated our data-fetching and rendering concerns.
* We’ve made our CommentList component reusable.
* We’ve given CommentList the ability to set PropTypes and fail loudly.

## Container / Presentational Distribution.

### presentational components:

* Are concerned with how things look.
* May contain both presentational and container components** inside, and usually have some DOM markup and styles of their own.
* Often allow containment via this.props.children.
* Have no dependencies on the rest of the app, such as Flux actions or stores.
* Don’t specify how the data is loaded or mutated.
* Receive data and callbacks exclusively via props.
* Rarely have their own state (when they do, it’s UI state rather than data).
* Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.
* Examples: Page, Sidebar, Story, UserInfo, List.

### container components:

* Are concerned with how things work.
* May contain both presentational and container components** inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
* Provide the data and behavior to presentational or other container components.
* Call Flux actions and provide these as callbacks to the presentational components.
* Are often stateful, as they tend to serve as data sources.
* Are usually generated using higher order components such as connect() from React Redux, createContainer() from Relay, or Container.create() from Flux Utils, rather than written by hand.
* Examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList.

## Benefits

* Better separation of concerns. You understand your app and your UI better by writing components this way.
* Better reusability. You can use the same presentational component with completely different state sources, and turn those into separate container components that can be further reused.
* Presentational components are essentially your app’s “palette”. You can put them on a single page and let the designer tweak all their variations without touching the app’s logic. You can run screenshot regression tests on that page.
* This forces you to extract “layout components” such as Sidebar, Page, ContextMenu and use this.props.children instead of duplicating the same markup and layout in several container components.

> Remember, components don’t have to emit DOM. They only need to provide composition boundaries between UI concerns.

## When to Introduce Containers?

I suggest you to start building your app with just presentational components first. Eventually you’ll realize that you are passing too many props down the intermediate components. When you notice that some components don’t use the props they receive but merely forward them down and you have to rewire all those intermediate components any time the children need more data, it’s a good time to introduce some container components. This way you can get the data and the behavior props to the leaf components without burdening the unrelated components in the middle of the tree.

This is an ongoing process of refactoring so don’t try to get it right the first time. As you experiment with this pattern, you will develop an intuitive sense for when it’s time to extract some containers, just like you know when it’s time to extract a function.

## Other Dichotomies

It’s important that you understand that the distinction between the presentational components and the containers is not a technical one. Rather, it is a distinction in their purpose.

By contrast, here are a few related (but different!) technical distinctions:

* Stateful and Stateless. Some components use React setState() method and some don’t. While container components tend to be stateful and presentational components tend to be stateless, this is not a hard rule. Presentational components can be stateful, and containers can be stateless too.
* Classes and Functions. Since React 0.14, components can be declared both as classes and as functions. Functional components are simpler to define but they lack certain features currently available only to class components. Some of these restrictions may go away in the future but they exist today. Because functional components are easier to understand, I suggest you to use them unless you need state, lifecycle hooks, or performance optimizations, which are only available to the class components at this time.
* Pure and Impure. People say that a component is pure if it is guaranteed to return the same result given the same props and state. Pure components can be defined both as classes and functions, and can be both stateful and stateless. Another important aspect of pure components is that they don’t rely on deep mutations in props or state, so their rendering performance can be optimized by a shallow comparison in their shouldComponentUpdate() hook. Currently only classes can define shouldComponentUpdate() but that may change in the future.

Both presentational components and containers can fall into either of those buckets. In my experience, presentational components tend to be stateless pure functions, and containers tend to be stateful pure classes. However this is not a rule but an observation, and I’ve seen the exact opposite cases that made sense in specific circumstances.

Don’t take the presentational and container component separation as a dogma. Sometimes it doesn’t matter or it’s hard to draw the line. If you feel unsure about whether a specific component should be presentational or a container, it might be too early to decide. Don’t sweat it!