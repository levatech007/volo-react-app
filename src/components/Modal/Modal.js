import React, { Component } from "react";
import "./modal.css";

class Modal extends Component {

  render() {
    return(
      <div className="screen">
        <div className="modal-window">
          <div>
            <h3>Modal box title</h3>
          </div>
          <hr></hr>
          <div>
            <p>This is the modal box content section</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
