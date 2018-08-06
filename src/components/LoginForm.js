import React, { Component } from "react";
import ChangePasswordModal from "./ChangePasswordModal.js";

class LoginForm extends Component {
  constructor() {
      super();
      this.state = {
        user: {
          email: "",
          password: "",
          changePasswordModal: false,
        }
      }
      this.onEmailInputChange = this.onEmailInputChange.bind(this);
      this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.showChangePasswordModal = this.showChangePasswordModal.bind(this);
      this.closeChangePasswordModal = this.closeChangePasswordModal.bind(this);
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

    showChangePasswordModal() {
      this.setState({
        changePasswordModal: true
      });
    }

    closeChangePasswordModal() {
      this.setState({
        changePasswordModal: false
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
          <a onClick={ this.showChangePasswordModal }><small>Forgot your password?</small></a>
          { this.state.changePasswordModal ? <ChangePasswordModal close={ this.closeChangePasswordModal} /> : null }
        </div>
      </div>
    )
  }
}

export default LoginForm;
