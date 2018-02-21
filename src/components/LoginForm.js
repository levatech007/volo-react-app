import React, { Component } from 'react';

class LoginForm extends Component {

  render() {
    return (
      <div className="col-6">
        <div className="row justify-content-md-center">
          <h2>Log In</h2>
        </div>
        <div className="row justify-content-md-center">
          <form className="forms">
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <div className="row justify-content-md-center">
              <input
                type="submit"
                className="btn btn-light"
                value="Log In"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;
