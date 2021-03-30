import React from "react";

export class Header extends React.Component {
  render() {
    return (
      <div className="grid header">
        <div className="salutation cell -8of12">
          <div className="content">
            <div className="name">
              <center>
                <b> {this.props.nam} </b>
                <hr />
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
