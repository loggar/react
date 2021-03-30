import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./Header";
import { Textbox } from "./Textbox";
import {
  DisplayToday,
  DisplayTomorrow,
  DisplayDayAfterTomorrow,
} from "./Display";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Today: [],
      Tomorrow: [],
      Day_After_Tomorrow: [],
      username: "yo buddy!",
    };
    this.updateEntry = this.updateEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  updateEntry(term, day) {
    if (day === "Today") {
      this.setState({
        Today: [...this.state.Today, term],
      });
    } else if (day === "Tomorrow") {
      this.setState({
        Tomorrow: [...this.state.Tomorrow, term],
      });
    } else if (day === "Day_After_Tomorrow") {
      this.setState({
        Day_After_Tomorrow: [...this.state.Day_After_Tomorrow, term],
      });
    }
  }

  deleteEntry(index, day) {
    if (day === "Today") {
      let filterList = this.state.Today.filter((elem, i) => {
        if (i === index) {
          return false;
        }
        return true;
      });
      this.setState({
        Today: filterList,
      });
    } else if (day === "Tomorrow") {
      let filterList = this.state.Tomorrow.filter((elem, i) => {
        if (i === index) {
          return false;
        }
        return true;
      });
      this.setState({
        Tomorrow: filterList,
      });
    } else if (day === "Day_After_Tomorrow") {
      let filterList = this.state.Day_After_Tomorrow.filter((elem, i) => {
        if (i === index) {
          return false;
        }
        return true;
      });
      this.setState({
        Day_After_Tomorrow: filterList,
      });
    } else {
      console.log("something went wrong while removing item…");
    }
  }

  render() {
    return (
      <div>
        <Header nam={this.state.username} />
        <Textbox updateEntry={this.updateEntry} />
        <hr />
        <div className="grid">
          <DisplayToday
            items={this.state.Today}
            deleteItem={this.deleteEntry}
          />
          <DisplayTomorrow
            items={this.state.Tomorrow}
            deleteItem={this.deleteEntry}
          />
          <DisplayDayAfterTomorrow
            items={this.state.Day_After_Tomorrow}
            deleteItem={this.deleteEntry}
          />
        </div>
      </div>
    );
  }
}

export default App;
