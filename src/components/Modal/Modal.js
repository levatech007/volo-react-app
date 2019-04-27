import React, { Component } from "react";
import "./modal.css";

class Modal extends Component {

  render() {
    return(
      <div className="screen">
        <div className="modal-window">
          <div>
            <button className="close-btn" type="submit">X</button>
            <h3>{ this.props.title }</h3>
          </div>
          <hr></hr>
          <div className="modal-cont">
            { this.props.form }
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
