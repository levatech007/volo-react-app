import React, { Component } from "react";
import $         from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import Modal     from "../Modal/Modal.js";
import Alert     from "../Alert/Alert.js";
import "./form.css";

class ContactForm extends Component {
  constructor() {
      super();
      this.state = {
        name:   "",
        email:  "",
        message:   "",
        alerts: {
          showAlert:    false,
          alertMessage: "",
          alertStyle:   "",
        },
        recaptchaResponse: "",
        formSubmitted:     false,
        inputFields:       ["name", "email"],
        formButtons:       ["submit", "cancel"]
      }
      this.renderContactForm    = this.renderContactForm.bind(this);
      this.handleInputChange    = this.handleInputChange.bind(this);
      this.handleFormSubmission = this.handleFormSubmission.bind(this);
      this.onRecaptchaChange    = this.onRecaptchaChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault()
    const target = e.target
    const name   = target.name
    const value  = target.value

    this.setState({ [name]: value })
  }

  handleFormSubmission(e) {
    console.log(this.state.name)
    console.log(this.state.email)
    console.log(this.state.message)
    e.preventDefault();
    if (this.state.recaptchaResponse) {
      $.post({
        url: `${process.env.REACT_APP_BACKEND_URL}/message`,
        data: {
          name:   this.state.name,
          email:  this.state.email,
          message:   this.state.message
              },
        success: (response) => {
          this.setState({
                          name:   "",
                          email:  "",
                          message:   "",
                          alerts: {
                            showAlert:    true,
                            alertMessage: response.result,
                            alertStyle:   "alert-box ok",
                          },
                          recaptchaResponse: "",
                          formSubmitted:     true,
                        })
        },
        error: (error) => {
          this.setState({
                          name:   "",
                          email:  "",
                          message:   "",
                          alerts: {
                            showAlert:    true,
                            alertMessage: "Something went wrong. Try again",
                            alertStyle:   "alert-box error",
                          },
                          recaptchaResponse: "",
                          formSubmitted:     false,
                        })
        }
      })
    } else {
      this.setState({
                      name:   "",
                      email:  "",
                      message:   "",
                      alerts: {
                        showAlert:    true,
                        alertMessage: "Something went wrong. Try again",
                        alertStyle:   "alert-box error",
                      },
                      recaptchaResponse: "",
                      formSubmitted:     false,
                    })
    }
  }

  onRecaptchaChange(response) {
    this.setState({ recaptchaResponse: response });
  }

  renderContactForm() {
    return(
        <form onSubmit={ this.handleFormSubmission }>
          {
            this.state.inputFields.map((field, idx) => {
              let labelName = `${ field.charAt(0).toUpperCase() }${ field.slice(1) }`
              return(
                <div className="row" key={ idx }>
                  <div className="col-sm-4">
                    <label>{ labelName }<span className="red-text">*</span></label>
                  </div>
                  <div className="col-sm-8">
                    <input
                      type={ (field === 'email') ? "email" : "text" }
                      name={ field }
                      required="required"
                      placeholder={ `Your ${ field }` }
                      onChange={ this.handleInputChange }
                      value={ this.state[field] }
                    />
                  </div>
                </div>
              )
            })
          }
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
                onChange={ this.handleInputChange }
                value={ this.state.message }
                >
                </textarea>
            </div>
        </div>
        <div className="row">
          <ReCAPTCHA
            ref="recaptcha"
            sitekey={ process.env.REACT_APP_SITE_KEY }
            onChange={ this.onRecaptchaChange }/>
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
