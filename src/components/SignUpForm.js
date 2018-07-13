import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

class SignupForm extends Component {
  constructor() {
      super();
      this.state = {
        user: {
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          recaptchaResponse: "",
        }
      }
      this.onNameInputChange = this.onNameInputChange.bind(this);
      this.onEmailInputChange = this.onEmailInputChange.bind(this);
      this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
      this.onConfirmPasswordInputChange = this.onConfirmPasswordInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onNameInputChange(e) {
      this.setState({
        user: {
          name: e.target.value,
          email: this.state.user.name,
          password: this.state.user.password,
          password_confirmation: this.state.user.password_confirmation,
        }
      })
    }

    onEmailInputChange(e) {
      this.setState({
        user: {
          name: this.state.user.name,
          email: e.target.value,
          password: this.state.user.password,
          password_confirmation: this.state.user.password_confirmation,
        }
      })
    }

    onPasswordInputChange(e) {
      this.setState({
        user: {
          name: this.state.user.name,
          email: this.state.user.email,
          password: e.target.value,
          password_confirmation: this.state.user.password_confirmation,
        }
      })
    }

    onConfirmPasswordInputChange(e) {
      this.setState({
        user: {
          name: this.state.user.name,
          email: this.state.user.email,
          password: this.state.user.password,
          password_confirmation: e.target.value,
        }
      })
    }

    onFormSubmit(e) {
      e.preventDefault();
      if (this.state.recaptchaResponse) {
        let user = this.state.user
        this.setState({
          user: {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
          }
        })
        this.props.processSignupForm(user)
      }
    }

    onChange(response) {
      this.setState({
      recaptchaResponse: response
    });
  }

  render() {
    return (
      <div className="col-6">
        <div className="row justify-content-center">
          <h2>Sign Up!</h2>
        </div>
        <div className="row justify-content-md-center">
          <form onSubmit={ this.onFormSubmit } className="forms">
            <div className="form-group">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={this.onNameInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={this.onEmailInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={this.onPasswordInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={this.onConfirmPasswordInputChange}
              />
            </div>
            <div className="row justify-content-center">
                    <ReCAPTCHA
                      ref="recaptcha"
                      sitekey= process.env.SITE_KEY
                      onChange={ this.onChange }/>
                  </div>
            <div className="row justify-content-md-center">
              <input
                type="submit"
                className="btn btn-light"
                value="Create Account"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignupForm;
