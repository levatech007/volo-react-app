import React, { Component } from "react";
import RequestPasswordChangeModal from "./RequestPasswordChangeModal.js";

class LoginForm extends Component {
  constructor() {
      super();
      this.state = {
        user: {
          email: "",
          password: "",
          requestPasswordChangeModal: false,
        }
      }
      this.onEmailInputChange = this.onEmailInputChange.bind(this);
      this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.showRequestPasswordChangeModal = this.showRequestPasswordChangeModal.bind(this);
      this.closeRequestPasswordChangeModal = this.closeRequestPasswordChangeModal.bind(this);
     }

    onEmailInputChange(e) {
      this.setState({
        user: {
          email: e.target.value,
          password: this.state.user.password
        }
      })
    }

    onPasswordInputChange(e) {
      this.setState({
        user: {
          email: this.state.user.email,
          password: e.target.value
        }
      })
    }

    onFormSubmit(e) {
      e.preventDefault();
      let user = this.state.user
      this.props.processLoginForm(user)
      this.setState({
        user: {
          email: "",
          password: ""
        }
      })
    }

    showRequestPasswordChangeModal() {
      this.setState({
        requestPasswordChangeModal: true
      });
    }

    closeRequestPasswordChangeModal() {
      this.setState({
        requestPasswordChangeModal: false
      });
    }

  render() {
    return (
      <div className="col-6">
        <div className="row justify-content-md-center">
          <h2>Log In</h2>
        </div>
        <div className="row justify-content-md-center">
          <form onSubmit={ this.onFormSubmit } className="forms">
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
            <div className="row justify-content-md-center">
              <input
                type="submit"
                className="btn btn-light"
                value="Log In"
              />
            </div>
          </form>
        </div>
        <div className="row justify-content-md-center">
          <button className="plain-button" onClick={ this.showRequestPasswordChangeModal }><small>Forgot your password?</small></button>
          { this.state.requestPasswordChangeModal ? <RequestPasswordChangeModal close={ this.closeRequestPasswordChangeModal} /> : null }
        </div>
      </div>
    )
  }
}

export default LoginForm;
