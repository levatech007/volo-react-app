import React, { Component } from "react";
import Auth from "j-toker";
import LoginForm from "../components/LoginForm.js";
import SignupForm from "../components/SignUpForm.js";
import Alerts from "../components/Alerts.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      alertStyle: "alert alert-danger",
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
        this.setState({ errors: resp.reason })
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
            this.setState({ errors: resp.data.errors.full_messages })
          })
        }).fail((resp) => {
          this.setState({ errors: resp.data.errors.full_messages })
        })
      }

      processOauthLogin(provider) {
        Auth.oAuthSignIn({
          provider: provider
        })
        .then((user) => {
          alert('Welcome ' + user.name + '!');
        })
        .fail((resp) => {
          alert('Authentication failure: ' + resp.errors.join(' '));
        });
      }

  render() {
    return (
      <div className="container">
        { this.state.errors? <Alerts alert={ this.state.errors } style={ this.state.alertStyle } /> : null }
        <div className="row background">
          <LoginForm processLoginForm={ this.processLoginForm } processOauthLogin={ this.processOauthLogin }/>
          <SignupForm processSignupForm={ this.processSignupForm } />
        </div>
      </div>
    );
  }
}

export default Login;
