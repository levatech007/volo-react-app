import React, { Component } from "react";
import "./modal.css";

class Modal extends Component {

  render() {
    return(
      <div className="screen">
        <div className="modal-window">
          <div>
            <button className="close-btn" type="submit">X</button>
            <h3>Modal box title</h3>
          </div>
          <hr></hr>
          <div className="modal-cont">
            <p>This is the modal box content section</p>
          </div>
          <div>
            <button className="footer-btn submit" type="submit">Send</button>
            <button className="footer-btn cancel" type="submit">Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
