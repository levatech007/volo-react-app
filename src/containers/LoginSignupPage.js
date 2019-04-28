import React, { Component } from "react";
import Auth                 from "j-toker";
import LoginForm            from "../components/Forms/LoginForm.js";
import SignupForm           from "../components/Forms/SignupForm.js";
import Alert                from "../components/Alert/Alert.js";
import PasswordResetForm   from "../components/Forms/PasswordResetForm.js";

class LoginSignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
                    showAlert: false,
                    alerts: "",
                    alertStyle: "",
                    showSignUpForm: false,
                    showPasswordResetForm: false,
                  }
    this.processLogin            = this.processLogin.bind(this);
    this.processSignup           = this.processSignup.bind(this);
    this.processOauthLogin       = this.processOauthLogin.bind(this);
    this.toggleSignUpForm        = this.toggleSignUpForm.bind(this);
    this.togglePasswordResetForm = this.togglePasswordResetForm.bind(this);
    };

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  processLogin(user) {
    Auth.emailSignIn({
      email:    user.email,
      password: user.password,
    })
    .then((resp) => {
      this.props.history.push(`/users/${resp.data.id}`)
    })
    .fail((resp) => {
      this.setState({
                      showAlert:  true,
                      alerts:     resp.reason,
                      alertStyle: "alert-box error"
                    })
    })
  }

  processSignup(user) {
    Auth.emailSignUp({
      email:                  user.email,
      password:               user.password,
      name:                   user.name,
      password_confirmation:  user.password_confirmation,
    })
    .then((resp) => {
      Auth.emailSignIn({
          email:    user.email,
          password: user.password,
      })
      .then((resp) => {
        this.props.history.push(`/users/${resp.data.id}`)
      })
      .fail((resp) => {
        this.setState({
                        showAlert:  true,
                        alerts:     resp.data.errors.full_messages,
                        alertStyle: "alert-box error"
                      })
      })
    })
    .fail((resp) => {
        this.setState({
                        showAlert:  true,
                        alerts:     resp.data.errors.full_messages,
                        alertStyle: "alert-box error"
                      })
    })
  }

  processOauthLogin(provider) {
    Auth.oAuthSignIn({
      provider: provider,
      config:   "default",
    })
    .then((user) => {
      this.setState({
                      showAlert:  true,
                      alerts:     `Welcome ${ user.name }`,
                      alertStyle: "alert-box ok"
                    });
    })
    .fail((resp) => {
      this.setState({
                      showAlert:  true,
                      alerts:     `Auth failure: ${resp.errors}`,
                      alertStyle: "alert-box error"
                    });
    });
  }

  toggleSignUpForm() {
    this.setState({ showSignUpForm: !this.state.showSignUpForm })
  }

  togglePasswordResetForm() {
    this.setState({ showPasswordResetForm: !this.state.showPasswordResetForm })
  }

  renderLoginForm() {
    return(
      <div className="col-md-10 form-container">
        <h2>Log In</h2>
        <LoginForm processLogin={ this.processLogin } />
        <div className="row justify-content-center">
          <button
            className="plain-button"
            onClick={ this.togglePasswordResetForm }
            >Forgot your password?</button>
        </div>
        <div className="row justify-content-center align-items-end">
          <p>Don't have an account?
              <button
              className="plain-button"
              onClick={ this.toggleSignUpForm }
              >&nbsp;Sign Up
            </button>
          </p>
        </div>
      </div>
    )
  }

  renderSignupForm() {
    return(
      <div className="col-md-10 form-container">
        <h2>Sign Up</h2>
        <SignupForm processSignup={ this.processSignup } />
        <div className="row justify-content-center align-items-end">
          <p>Already have an account?
              <button
              className="plain-button"
              onClick={ this.toggleSignUpForm }
              >&nbsp;Log In
            </button>
          </p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        { this.state.showAlert? <Alert alert={ this.state.alerts } style={ this.state.alertStyle } /> : null }
        { this.state.showPasswordResetForm ?  <PasswordResetForm close={ this.togglePasswordResetForm } /> : null }
        <div className="row justify-content-center background">
          { this.state.showSignUpForm ? this.renderSignupForm() : this.renderLoginForm() }
        </div>
      </div>
    );
  }
}

export default LoginSignupPage;
