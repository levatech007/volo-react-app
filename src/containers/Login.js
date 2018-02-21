import React, { Component } from 'react';
import LoginForm from '../components/LoginForm.js'
import SignupForm from '../components/SignUpForm.js'

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="row background">
          <LoginForm />
          <SignupForm />
          </div>
        </div>
    );
  }
}

export default Login;
