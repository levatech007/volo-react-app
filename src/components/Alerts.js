import React, { Component } from "react";

class Alerts extends Component {

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-8">
          <div className={ this.props.style } role="alert">{ this.props.alert }</div>
        </div>
      </div>
    )
  }
}

export default Alerts;
