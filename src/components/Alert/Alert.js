import React, { Component } from "react";
import "./alert.css";

class Alert extends Component {
  render() {
    return(
      <div className={ this.props.style }>
      <p>{ this.props.alert }</p>
    </div>
    )
  }
}

export default Alert;
