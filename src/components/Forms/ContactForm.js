import React, { Component } from "react";
import Modal from "../Modal/Modal.js";
import "./form.css";

class ContactForm extends Component {
  constructor() {
      super();
      this.state = {
        showContactFormModal: true
      }
      this.renderContactForm = this.renderContactForm.bind(this);
  }

  renderContactForm() {
    return(
        <form>
        <div className="row">
          <div className="col-sm-4">
            <label>Title<span className="red-text">*</span></label>
          </div>
          <div className="col-sm-8">
            <input
              name="email"
              type="email"
              required="required"
              placeholder="Placeholder..."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label>Message<span className="red-text">*</span></label>
          </div>
          <div className="col-sm-8">
            <textarea
              name="message"
              rows="4"
              placeholder="Your message here"
              required="required"
              >
              </textarea>
          </div>
      </div>
      <div className="row">
        <button className="footer-btn submit" type="submit">Send</button>
        <button className="footer-btn cancel" type="submit">Cancel</button>
      </div>
    </form>
    )
  }

  render() {
    return(
      <Modal form={ this.renderContactForm() } title="Contact Us"/>
    )
  }
}

export default ContactForm;
