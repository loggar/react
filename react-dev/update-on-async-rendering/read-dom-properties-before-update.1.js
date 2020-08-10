class ScrollingList extends React.Component {
  listRef = null;
  previousScrollOffset = null;

  componentWillUpdate(nextProps, nextState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (this.props.list.length < nextProps.list.length) {
      this.previousScrollOffset =
        this.listRef.scrollHeight - this.listRef.scrollTop;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If previousScrollOffset is set, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (this.previousScrollOffset !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - this.previousScrollOffset;
      this.previousScrollOffset = null;
    }
  }

  render() {
    return <div ref={this.setListRef}>{/* ...contents... */}</div>;
  }

  setListRef = (ref) => {
    this.listRef = ref;
  };
}

// In the above example, componentWillUpdate is used to read the DOM property. However with async rendering, there may be delays between “render” phase lifecycles (like componentWillUpdate and render) and “commit” phase lifecycles (like componentDidUpdate). If the user does something like resize the window during this time, the scrollHeight value read from componentWillUpdate will be stale.
// The solution to this problem is to use the new “commit” phase lifecycle, getSnapshotBeforeUpdate. This method gets called immediately before mutations are made (e.g. before the DOM is updated). It can return a value for React to pass as a parameter to componentDidUpdate, which gets called immediately after mutations.
