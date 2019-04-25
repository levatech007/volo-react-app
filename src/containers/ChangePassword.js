import React, { Component } from "react";
import Auth from "j-toker";
import Alert from "../components/Alert/Alert.js";
import ReCAPTCHA from "react-google-recaptcha";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
                    newPassword:        "",
                    confirmPassword:    "",
                    alert:              false,
                    alertStyle:         "",
                    alertMessage:       "",
                    recaptchaResponse:  "",
                    userSignedIn:       false,
                    userName:           "",
                    userId:             "",
                  }
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.onUpdatePassword   = this.onUpdatePassword.bind(this);
    this.onChange           = this.onChange.bind(this);
  }

  componentDidMount() {
    Auth.validateToken()
    .then((user) => {
      this.setState({
                      userSignedIn: user.signedIn,
                      userName:     user.name,
                      userId:       user.id,
                    })
    })
  }

  handleInputChange(e) {
    e.preventDefault()
    const target  = e.target
    const name    = target.name
    const value   = target.value
    this.setState({ [name]: value })
  }

  onUpdatePassword(e) {
    e.preventDefault();
    if (this.state.recaptchaResponse) {
      Auth.updatePassword({
        password:               this.state.newPassword,
        password_confirmation:  this.state.confirmPassword,
      })
      .then((resp) => {
        this.setState({
                        newPassword:        "",
                        confirmPassword:    "",
                        alert:              true,
                        recaptchaResponse:  "",
                        alertStyle:         "alert-box ok",
                        alertMessage:       resp.message,
                      });
                                      //redirect user to login page? or profile? after a set time?
      })
      .fail((resp) => {
        this.setState({
                        newPassword:        "",
                        confirmPassword:    "",
                        alert:              true,
                        recaptchaResponse:  "",
                        alertStyle:         "alert-box error",
                        alertMessage:       resp.reason,
                      });
        //redirect user to login page?
      })
    } else {
      this.setState({
                      newPassword:        "",
                      confirmPassword:    "",
                      alert:              true,
                      recaptchaResponse:  "",
                      alertStyle:         "alert-box error",
                      alertMessage:       "Please try again",
                    });
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
        { this.state.alert? <Alert alert={ this.state.alertMessage } style={ this.state.alertStyle } /> : null }
        <div className="row align-items-center background">
          <div className="row justify-content-md-center">
            <form onSubmit={ this.onUpdatePassword } className="forms">
              <div className="form-group">
                <input
                  name="newPassword"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={ this.handleInputChange }
                  value={ this.state.newPassword }
                />
              </div>
              <div className="form-group">
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  onChange={ this.handleInputChange }
                  value={ this.state.confirmPassword }
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
