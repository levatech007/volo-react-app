import React, { Component } from "react";
import "./alert.css";

class Alert extends Component {
  render() {
    return(
      <div className={ this.props.style }>
        <ul>
          {
            this.props.alert.map((alert, idx) => {
              return(<li key={ idx }>{ alert }</li>)
            })
          }
        </ul>
    </div>
    )
  }
}

export default Alert;
