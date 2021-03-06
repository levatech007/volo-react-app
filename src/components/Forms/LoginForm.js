import React, { Component } from "react";
import "./form.css";

class LoginForm extends Component {
  constructor() {
      super();
      this.state = {
                      email:       "",
                      password:    "",
                      inputFields: ["email", "password"]
                    }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.processLoginForm  = this.processLoginForm.bind(this);
      this.renderLoginForm   = this.renderLoginForm.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault()
    const name   = e.target.name
    const value  = e.target.value
    this.setState({ [name]: value })
  }

  processLoginForm(e) {
    e.preventDefault();
    let user = {
                  email:    this.state.email,
                  password: this.state.password
                }
    this.props.processLogin(user)
    this.setState({
                    email:    "",
                    password: "",
                  })
  }

  renderLoginForm() {
    return(
      <form onSubmit={ this.processLoginForm }>
        {
          this.state.inputFields.map((field, idx) => {
            let labelName = `${ field.charAt(0).toUpperCase() }${ field.slice(1) }`
            return(
              <div className="row" key={ idx }>
                <div className="col-sm-4">
                  <label>{ labelName }<span className="red-text">*</span></label>
                </div>
                <div className="col-sm-8">
                  <input
                    type={ field }
                    name={ field }
                    required="required"
                    placeholder={ `Your ${ field }` }
                    onChange={ this.handleInputChange }
                    value={ this.state[field] }
                  />
                </div>
              </div>
            )
          })
        }
        <div className="row justify-content-center">
          <button className="footer-btn submit" type="submit">Log In</button>
        </div>
      </form>
    )
  }

  render() {
    return (
      <div>{ this.renderLoginForm() }</div>
    )
  }
}

export default LoginForm;
