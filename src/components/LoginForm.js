import React, { Component } from "react";
import RequestPasswordChangeModal from "./RequestPasswordChangeModal.js";
import OauthProviderButton from "../components/OauthProviderButton.js";


class LoginForm extends Component {
  constructor() {
      super();
      this.state = {
        user: {
          email: "",
          password: "",
        },
        showRequestPasswordChangeModal: false,
        oAuthLoginProviders: ["Google"]
      }
      this.onEmailInputChange = this.onEmailInputChange.bind(this);
      this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.toggleRequestPasswordChangeModal = this.toggleRequestPasswordChangeModal.bind(this);
      this.onOauthLogin = this.onOauthLogin.bind(this);
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

    onOauthLogin(provider) {
      this.props.processOauthLogin(provider)
    }

    toggleRequestPasswordChangeModal() {
      this.setState({
        showRequestPasswordChangeModal: !this.state.showRequestPasswordChangeModal
      });
    }

  render() {
    return (
      <div className="col-6">
        <div className="row justify-content-md-center">
          <h2 className="section-title">Log In</h2>
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
          <button className="plain-button" onClick={ this.toggleRequestPasswordChangeModal }><small>Forgot your password?</small></button>
          { this.state.showRequestPasswordChangeModal ? <RequestPasswordChangeModal close={ this.toggleRequestPasswordChangeModal} /> : null }
        </div>

        <div className="row justify-content-center hr-rule">
          <div className="col-md-3"><hr></hr></div>
          <div className="col-md-1"><p>or</p></div>
          <div className="col-md-3"><hr></hr></div>
        </div>
        <div className="row justify-content-center">
          <p>Coming soon...</p>
        </div>
        {
          this.state.oAuthLoginProviders.map((provider, idx) => {
            return(
              <OauthProviderButton provider={ provider } key={ idx } onOauthLogin={ this.onOauthLogin }/>
            )
          })
        }
      </div>
    )
  }
}

export default LoginForm;
