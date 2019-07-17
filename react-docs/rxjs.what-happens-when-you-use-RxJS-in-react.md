# What happens when you use RxJS in React?

ref) https://hackernoon.com/what-happens-when-you-use-rxjs-in-react-11ae5163fc0a

With observables we can easily manage asynchronous data streams, but what is a stream in a React component?

## Streams in React

To determine this, let’s start by analyzing a simple ClickCounter example:

```js
// react-clickcounter.js
class App extends React.Component {
  constructor(props) {
    this.state = { count: 0 }
  }

  onClick (e) {
    this.setState({
      count: this.state.count + 1
    })
  }

  render () {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.onClick.bind(this)}>Count Up!!</button>
      </div>
    )
  }
}
```

This is a component describing asynchronous behavior. On every `click` event on a `button` tag, the state is changed. Or in other words, the state **changes** as a result of **events** happening **over time**.

So, instead of defining **this.state** as an object which will later be overwritten, we can define it more declaratively:

```js
// react-statestream.js
const state = startWith({ count: 0 })
  .select('button')
  .on('click')
  .map((state, e) => ({
    count: state.count + 1
  }))
```

## Managing component streams

I created a small library called Recycle, which is my attempt at solving this issue. It converts “functional/reactive object description” into a React component.

Here is how a ClickCounter looks like when defined using Recycle:

```js
// recycle-clickcounter.js
recycle({
  initialState: { 
    timesClicked: 0 
  },

  update (sources) {
    return [
      sources.select('button')
        .on('click')
        .reducer(state => ({
          timesClicked: state.timesClicked + 1
        }))
    ]
  },

  view (props, state) {
    return (
      <div>
        <h1>{state.count}</h1>
        <button>Count Up!!</button>
      </div>
    )
  }
})
```

It works by “monkeypatching” `React.createElement`. Before a component is rendered, if a select query is matched with node element, recycle sets inline event listener defined in `update` function.

Each time event handler dispatches an event, it calls `selectedNode.rxSubject.next(e)`

In short, Recycle creates a classical React component out of this object by creating inline event handlers and handles component local state by using “Redux style” reducer operator.

## Pros

* Greater separation of concerns between component presentation and component logic.
* You don’t need classes so each part of a component can be defined and tested separately.
* Component description is more consistent. There is no custom `handleClick` events or `this.setState` statements that you need to worry about.
* State is calculated the same way as for redux store: `state = reducer(state, action)`.
* Redux container looks like a normal component and it’s more clear what it does.
* Easy to use in an existing React application (choose components which you wish to convert).

## Cons

* Observables. They come with trade-offs.
* You don’t like the idea of selecting nodes using class names, ids or tags
* You need to use advanced React API (like `forceUpdateor` `shouldComponentUpdate`)
* You need direct access to DOM elements (using `this.refs`) for external plugins or similar
