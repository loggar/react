// Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
	<li key={number.toString()}>
		{number}
	</li>
);

// The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys:

const todoItems = todos.map((todo) =>
	<li key={todo.id}>
		{todo.text}
	</li>
);

// When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort:

const todoItems = todos.map((todo, index) =>
	// Only do this if items have no stable IDs
	<li key={index}>
		{todo.text}
	</li>
);

// We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key. If you choose not to assign an explicit key to list items then React will default to using indexes as keys.