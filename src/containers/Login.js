import React, { Component } from "react";
import Auth from "j-toker";
import LoginForm from "../components/LoginForm.js"
import SignupForm from "../components/SignUpForm.js"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: ""
    }
    this.processLoginForm = this.processLoginForm.bind(this);
    this.processSignupForm = this.processSignupForm.bind(this);
    };

    processLoginForm(user) {
      Auth.emailSignIn({
        email:    user.email,
        password: user.password,
      }).then((resp) => {
        this.props.history.push(`/users/${resp.data.id}`)
      }).fail((resp) => {
        this.setState({ errors: resp.data.errors })
      })
    }

    processSignupForm(user) {
      Auth.emailSignUp({
        email: user.email,
        password: user.password,
        name: user.name,
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


  render() {
    return (
      <div className="container">
        { this.state.errors? <div className="alert alert-danger" role="alert">{this.state.errors}</div> : null }
        <div className="row align-items-center background">
          <LoginForm processLoginForm={ this.processLoginForm }/>
          <SignupForm processSignupForm={ this.processSignupForm } />
        </div>
      </div>
    );
  }
}

export default Login;
