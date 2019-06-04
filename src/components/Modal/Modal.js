import React, { Component } from "react";
import "./modal.css";

class Modal extends Component {

  render() {
    return(
      <div className="screen">
        <div className="modal-window">
          <div>
            <button className="close-btn" type="submit" onClick={ this.props.close }>X</button>
            <h3>{ this.props.title }</h3>
          </div>
          <hr></hr>
          <div className="modal-cont">
            { this.props.content }
          </div>
          <div className="row justify-content-center">
            <button className="footer-btn submit" type="submit" onClick={ this.props.submit }>{ this.props.buttonText || "Send"}</button>
            <button className="footer-btn cancel" type="submit" onClick={ this.props.close }>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
