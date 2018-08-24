import React, { Component } from "react";
import Alerts from "../components/Alerts.js"
import ReCAPTCHA from "react-google-recaptcha";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: "",
      confirmPassword: "",
      errors: "",
      recaptchaResponse: "",
    }
    this.onNewPasswordInputChange = this.onNewPasswordInputChange.bind(this);
    this.onConfirmPasswordInputChange = this.onConfirmPasswordInputChange.bind(this);
    this.onNewPasswordSubmit = this.onNewPasswordSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onNewPasswordInputChange(e) {
    this.setState({
      newPassword: e.target.value,
      confirmPassword: this.state.confirmPassword,
    })
  }

  onConfirmPasswordInputChange(e) {
    this.setState({
      newPassword: this.state.newPassword,
      confirmPassword: e.target.value,
    })
  }

  onNewPasswordSubmit(e) {
    e.preventDefault();
    if (this.state.recaptchaResponse) {
      console.log("OK!")
    } else {
      console.log("try again")
    }
  }

  onChange(response) {
    this.setState({
    recaptchaResponse: response
  });
}

  render() {
    return (
      <div className="container">
        { this.state.errors? <Alerts errors={ this.state.errors } /> : null }
        <div className="row align-items-center background">
          <div className="row justify-content-md-center">
            <form onSubmit={ this.onNewPasswordSubmit } className="forms">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={ this.onNewPasswordInputChange }
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  onChange={ this.onConfirmPasswordInputChange }
                />
              </div>
              <div className="row justify-content-center">
                <ReCAPTCHA
                  ref="recaptcha"
                  sitekey={ process.env.REACT_APP_SITE_KEY }
                  onChange={ this.onChange }/>
              </div>
              <div className="row justify-content-md-center">
                <input
                  type="submit"
                  className="btn btn-light"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ChangePassword;
