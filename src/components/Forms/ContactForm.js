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
        showAlert:    false,
        alertMessages: [],
        alertStyle:   "",
        recaptchaResponse: "",
        formSubmitted:     false,
        inputFields:       ["name", "email"],
        formButtons:       ["submit", "cancel"]
      }
      this.renderContactForm    = this.renderContactForm.bind(this);
      this.handleInputChange    = this.handleInputChange.bind(this);
      this.validateFormInputs   = this.validateFormInputs.bind(this);
      this.handleFormSubmission = this.handleFormSubmission.bind(this);
      this.onRecaptchaChange    = this.onRecaptchaChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault()
    const name   = e.target.name
    const value  = e.target.value

    this.setState({ [name]: value })
  }

  validateFormInputs() {
    let alertMessages = []
    let formIsValid = true
    if (!this.state.name) {
      formIsValid = false
      alertMessages.push("Name must be present.")
    }
    const validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(this.state.email) {
      if (!validEmailPattern.test(this.state.email)) {
        formIsValid = false
        alertMessages.push("Email is not valid.")
      }
    } else {
      formIsValid = false
      alertMessages.push("Email must be present.")
    }
    if (!this.state.message) {
      formIsValid = false
      alertMessages.push("Message must be present.")
    }
    this.setState({ alertMessages: alertMessages })

    return formIsValid
  }

  handleFormSubmission(e) {
    e.preventDefault();
    if (this.state.recaptchaResponse) {
      if(this.validateFormInputs()) {
        let message = {
          name:   this.state.name,
          email:  this.state.email,
          body:   this.state.message
        }
        $.post({
          url: `${process.env.REACT_APP_BACKEND_URL}/message`,
          data: { message: message },
          success: (response) => {
            this.setState({
                            name:   "",
                            email:  "",
                            message:   "",
                            showAlert:    true,
                            alertMessages: [response.result],
                            alertStyle:   "alert-box ok",
                            recaptchaResponse: "",
                            formSubmitted:     true,
                          })
          },
          error: (error) => {
            this.setState({
                            name:   "",
                            email:  "",
                            message:   "",
                            showAlert:    true,
                            alertMessages: ["Something went wrong. Try again."],
                            alertStyle:   "alert-box error",
                            recaptchaResponse: "",
                            formSubmitted:     false,
                          })
          }
        })
      } else { // form not valid
          this.setState({
                          name:   "",
                          email:  "",
                          message:   "",
                          showAlert:    true,
                          alertStyle:   "alert-box error",
                          recaptchaResponse: "",
                          formSubmitted:     false,
                        })
      }
    } else { // recaptcha not valid
      this.setState({
                      name:   "",
                      email:  "",
                      message:   "",
                      showAlert:    true,
                      alertMessages: ["Please check the Recaptcha box."],
                      alertStyle:   "alert-box error",
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
          { this.state.showAlert ? <Alert alert={ this.state.alertMessages } alertStyle={ this.state.alertStyle } /> : null }
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
        <div className="row justify-content-center">
          <ReCAPTCHA
            ref="recaptcha"
            sitekey={ process.env.REACT_APP_SITE_KEY }
            onChange={ this.onRecaptchaChange }/>
        </div>
      </form>
    )
  }

  render() {
    return(
      <Modal
        content={ this.renderContactForm() }
        close={ this.props.close }
        submit={ this.handleFormSubmission }
        title="Contact Us"/>
    )
  }
}

export default ContactForm;
