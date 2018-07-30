## Step 5: Add Inverse Data Flow

So far, we’ve built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it’s time to support data flowing the other way: the form components deep in the hierarchy need to update the state in FilterableProductTable.

React makes this data flow explicit to make it easy to understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you’ll see that React ignores your input. This is intentional, as we’ve set the value prop of the input to always be equal to the state passed in from FilterableProductTable.

Let’s think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, FilterableProductTable will pass callbacks to SearchBar that will fire whenever the state should be updated. We can use the onChange event on the inputs to be notified of it. The callbacks passed by FilterableProductTable will call setState(), and the app will be updated.

Though this sounds complex, it’s really just a few lines of code. And it’s really explicit how your data is flowing throughout the app.

## And That’s It

Hopefully, this gives you an idea of how to think about building components and applications with React. While it may be a little more typing than you’re used to, remember that code is read far more than it’s written, and it’s extremely easy to read this modular, explicit code. As you start to build large libraries of components, you’ll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink.