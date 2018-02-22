import React, { Component } from 'react';
import LoginForm from '../components/LoginForm.js'
import SignupForm from '../components/SignUpForm.js'

class Login extends Component {
  constructor(props) {
    super(props);
    this.processLoginForm = this.processLoginForm.bind(this);
    // this.changeUser = this.changeUser.bind(this);
    };

    processLoginForm(user) {

      console.log('email:', user.email);
      console.log('password:', user.password);
    }

    processSignupForm(user) {
      console.log('name:', user.name);
      console.log('email:', user.email);
      console.log('password:', user.password);
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
