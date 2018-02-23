import React, { Component } from "react";
import Auth from "j-toker";
import LoginForm from "../components/LoginForm.js"
import SignupForm from "../components/SignUpForm.js"

class Login extends Component {
  constructor(props) {
    super(props);
    this.processLoginForm = this.processLoginForm.bind(this);
    // this.changeUser = this.changeUser.bind(this);
    };

    processLoginForm(user) {
      Auth.emailSignIn({
        email:    user.email,
        password: user.password,
      }).then((resp) => {
        console.log(resp)
      }).fail((resp) => {
        console.log(resp)
      });
    }

    processSignupForm(user) {
      Auth.emailSignUp({
        email: user.email,
        password: user.password,
        name: user.name,
      }).then((resp) => {
        console.log(resp)
      }).fail((resp) => {
        console.log(resp)
      })
    }


  render() {
    return (
      <div className="container">
        <div className="row background">
          <LoginForm processLoginForm={ this.processLoginForm }/>
          <SignupForm processSignupForm={ this.processSignupForm } />
          </div>
        </div>
    );
  }
}

export default Login;
