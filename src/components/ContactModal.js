import React, { Component } from "react";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "./Alerts"

class ContactModal extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
      email: "",
      body: "",
      recaptchaResponse: "",
      alert: false,
      alertMessage: "",
      alertStyle: "",
      submitted: false,
      inputFields: ["name", "email"]
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderContactForm = this.renderContactForm.bind(this);
    this.onFormSubmit= this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault()
    const target = e.target
    const name = target.name
    const value = target.value
    this.setState({
      [name]: value
    })
  }
  // add FE validations

  renderContactForm() {
    return(
        <form onSubmit={ this.onFormSubmit } className="forms">
          {
            this.state.inputFields.map((field, idx) => {
              let labelName = `${field.charAt(0).toUpperCase()}${field.slice(1)}`
              return(
                <div className="form-group row" key={ idx }>
                  <label className="col-sm-3 col-form-label">{ labelName }<span className="red-text">*</span></label>
                  <div className="col-sm-9">
                    <input
                      type={ (field === 'email') ? "email" : "text" }
                      name={ field }
                      className="form-control"
                      placeholder={ `Your ${ field }` }
                      onChange={ this.handleInputChange }
                      value={ this.state[field] }
                    />
                  </div>
                </div>
              )
            })
          }
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Message<span className="red-text">*</span></label>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                rows="4"
                name="body"
                placeholder="Your message here"
                onChange={this.handleInputChange}
                value={ this.state.body }
              >
              </textarea>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-9 offset-md-3">
            <ReCAPTCHA
              ref="recaptcha"
              sitekey={ process.env.REACT_APP_SITE_KEY }
              onChange={ this.onChange }/>
            </div>
          </div>
          <div className="row justify-content-center submit-btn">
            <div className="col-md-9 offset-md-3">
              <input
                type="submit"
                className="btn btn-primary"
                value="Submit"
              />
              <button type="button" className="btn" onClick={ this.props.toggleContactModal }>Cancel</button>
            </div>
          </div>
        </form>
    )
  }

  onFormSubmit(e) {
    e.preventDefault();
    let message = {
      name: this.state.name,
      email: this.state.email,
      body: this.state.body
    }
    console.log(message)
    if (this.state.recaptchaResponse) {
      $.post({
        url: `${process.env.REACT_APP_BACKEND_URL}/message`,
        data: {
          message: message
        },
        success: (response) => {
          console.log(response)
          this.setState({
            name: "",
            email: "",
            body: "",
            recaptchaResponse: "",
            alert: true,
            alertMessage: response.result,
            alertStyle: "alert alert-success",
            submitted: true,
          })
        },
        error: (error) => {
          console.log(error)
          this.setState({
            name: "",
            email: "",
            body: "",
            recaptchaResponse: "",
            alert: true,
            alertMessage: "Oops...",
            alertStyle: "alert alert-danger",
            submitted: false,
          })
        }
      })
    } else {

    }
  }

  onChange(response) {
    this.setState({
    recaptchaResponse: response
  });
}

  render() {
    return (
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Us</h5>
                <button type="button" className="close" onClick={ this.props.toggleContactModal }>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    { this.state.alert ? <Alert style={ this.state.alertStyle } alert={ this.state.alertMessage } /> : null }
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    { this.state.submitted ? null : this.renderContactForm() }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ContactModal;
