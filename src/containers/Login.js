import React, { Component } from "react";
import Auth from "j-toker";
import LoginForm from "../components/LoginForm.js";
import SignupForm from "../components/SignUpForm.js";
import Alerts from "../components/Alerts.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alerts: "",
      alertStyle: "",
    }
    this.processLoginForm = this.processLoginForm.bind(this);
    this.processSignupForm = this.processSignupForm.bind(this);
    };

    componentDidMount() {
      window.scrollTo(0, 0)
    }

    processLoginForm(user) {
      Auth.emailSignIn({
        email:    user.email,
        password: user.password,
      }).then((resp) => {
        this.props.history.push(`/users/${resp.data.id}`)
      }).fail((resp) => {
        console.log(resp)
        this.setState({
          showAlert: true,
          alerts: resp.reason,
          alertStyle: "alert alert-danger"
        })
      })
    }

    processSignupForm(user) {
      Auth.emailSignUp({
        email: user.email,
        password: user.password,
        name: user.name,
        password_confirmation: user.password_confirmation,
      })
        .then((resp) => {
          Auth.emailSignIn({
            email:    user.email,
            password: user.password,
          })
          .then((resp) => {
            this.props.history.push(`/users/${resp.data.id}`)
          }).fail((resp) => {
            this.setState({
              showAlert: true,
              alerts: resp.data.errors.full_messages,
              alertStyle: "alert alert-danger"
            })
          })
        }).fail((resp) => {

          this.setState({
            showAlert: true,
            alerts: resp.data.errors.full_messages,
            alertStyle: "alert alert-danger"
          })
        })
      }

      processOauthLogin(provider) {
        Auth.oAuthSignIn({
          provider: provider,
          config: "default",
        })
        .then((user) => {
          console.log(user)
          this.setState({
            showAlert: true,
            alerts: `Welcome ${ user.name }`,
            alertStyle: "alert alert-danger"
          })
        })
        .fail((resp) => {
          console.log(resp)
          this.setState({
            showAlert: true,
            alerts: `Auth failure: ${resp.errors}`,
            alertStyle: "alert alert-danger"
          })
        });
      }

  render() {
    console.log(Auth.user)
    return (
      <div className="container">
        { this.state.showAlert? <Alerts alert={ this.state.alerts } style={ this.state.alertStyle } /> : null }
        <div className="row background">
          <LoginForm processLoginForm={ this.processLoginForm } processOauthLogin={ this.processOauthLogin }/>
          <SignupForm processSignupForm={ this.processSignupForm } />
        </div>
      </div>
    );
  }
}

export default Login;
