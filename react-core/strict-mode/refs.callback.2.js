// You can pass callback refs between components like you can with object refs that were created with React.createRef().

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return <CustomTextInput inputRef={(el) => (this.inputElement = el)} />;
  }
}

// In the example above, Parent passes its ref callback as an inputRef prop to the CustomTextInput, and the CustomTextInput passes the same function as a special ref attribute to the <input>. As a result, this.inputElement in Parent will be set to the DOM node corresponding to the <input> element in the CustomTextInput.
