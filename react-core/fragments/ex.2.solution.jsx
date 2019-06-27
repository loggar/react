class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}

class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}

/* which results in a correct <Table /> output of:

<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>

*/
