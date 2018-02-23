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
      fetch('http://localhost:8000/auth/sign_in', {
      method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      }).then((res) => {
        return res.json();
      }).then((response) => {
        console.log(response)
      })
    }

    processSignupForm(user) {
      console.log('name:', user.name);
      console.log('email:', user.email);
      console.log('password:', user.password);
      fetch('http://localhost:8000/auth', {
      method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        })
      }).then((res) => {
        return res.json();
      }).then((response) => {
        console.log(response)
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
