// Refs are a special attribute that are available on all React components. They allow us to create a reference to a given element / component when the component mounts
// We call useRef (at top of component) and attach the returned value to the element's ref attribute to refer to it
// Once we create a reference, we use the current property to modify (mutate) the element's properties or can call any available methods on that element (like .focus() to focus an input)

function App() {
  const [query, setQuery] = React.useState("react hooks");
  // we can pass useRef a default value
  // we don't need it here, so we pass in null to ref an empty object
  const searchInput = useRef(null);

  function handleClearSearch() {
    // current references the text input once App mounts
    searchInput.current.value = "";
    // useRef can store basically any value in its .current property
    searchInput.current.focus();
  }

  return (
    <form>
      <input
        type="text"
        onChange={(event) => setQuery(event.target.value)}
        ref={searchInput}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClearSearch}>
        Clear
      </button>
    </form>
  );
}
