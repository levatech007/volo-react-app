import React, { Component } from "react";
import Auth                 from "j-toker";
import LoginForm            from "../components/Forms/LoginForm.js";
import SignupForm           from "../components/SignUpForm.js";
import Alert                from "../components/Alert/Alert.js";
import Modal                from "../components/Modal/Modal.js";

class LoginSignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
                    showAlert: false,
                    alerts: "",
                    alertStyle: "",
                    showSignUpForm: false,
                    showForgotPasswordForm: false,
                  }
    this.processLogin              = this.processLogin.bind(this);
    this.processSignup             = this.processSignup.bind(this);
    this.processOauthLogin         = this.processOauthLogin.bind(this);
    this.toggleSignUpForm          = this.toggleSignUpForm.bind(this);
    this.toggleForgotPasswordForm = this.toggleForgotPasswordForm.bind(this);
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

  toggleForgotPasswordForm() {
    this.setState({ showForgotPasswordForm: !this.state.showForgotPasswordForm })
  }

  renderLoginPage() {
    return(
      <div className="col-md-8 form-container">
        <h2>Login</h2>
        <LoginForm processLogin={ this.processLogin } />
        <button className="plain-button" onClick={ this.toggleForgotPasswordForm }>Forgot your password?</button>
        <p>Don't have an account?</p>
          <button className="plain-button" onClick={ this.toggleSignUpForm }> Sign up!</button>
      </div>
    )
  }

  renderSignUpPage() {
    return(
      <div className="col-md-8 form-container">
        <h2>Sign Up</h2>
        {/* <SignUpForm processLogin={ this.processSignup } /> */}
        <p>Already have an account?</p>
        <button className="plain-button" onClick={ this.toggleSignUpForm }>Log in!</button>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        { this.state.showAlert? <Alert alert={ this.state.alerts } style={ this.state.alertStyle } /> : null }
        { this.state.showForgotPasswordForm ?  <Modal /> : null }
        <div className="row justify-content-center background">
          { this.state.showSignUpForm ? this.renderSignUpPage() : this.renderLoginPage() }
        </div>
      </div>
    );
  }
}

export default LoginSignupPage;
