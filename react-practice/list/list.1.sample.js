const mylist = ["a", "b", "c"];

const App = () => <SimpleList list={mylist} />;

const SimpleList = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
