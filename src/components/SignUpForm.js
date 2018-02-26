import React, { Component } from 'react';

class SignupForm extends Component {
  constructor() {
      super();
      this.state = {
        user: {
          name: "",
          email: "",
          password: "",
        }
      }
      this.onNameInputChange = this.onNameInputChange.bind(this);
      this.onEmailInputChange = this.onEmailInputChange.bind(this);
      this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onNameInputChange(e) {
      this.setState({
        user: {
          name: e.target.value,
          email: this.state.user.name,
          password: this.state.user.password,
        }
      })
    }

    onEmailInputChange(e) {
      this.setState({
        user: {
          name: this.state.user.name,
          email: e.target.value,
          password: this.state.user.password,
        }
      })
    }

    onPasswordInputChange(e) {
      this.setState({
        user: {
          name: this.state.user.name,
          email: this.state.user.email,
          password: e.target.value
        }
      })
    }

    onFormSubmit(e) {
      e.preventDefault();
      let user = this.state.user
      this.props.processSignupForm(user)
      this.setState({
        user: {
          name: "",
          email: "",
          password: "",
        }
      })
    }

  render() {
    return (
      <div className="col-6">
        <div className="row justify-content-center">
          <h2>Sign Up!</h2>
        </div>
        <div className="row justify-content-md-center">
          <form onSubmit={ this.onFormSubmit } className="forms">
            <div className="form-group">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={this.onNameInputChange}
              />
            </div>
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
                value="Create Account"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignupForm;
