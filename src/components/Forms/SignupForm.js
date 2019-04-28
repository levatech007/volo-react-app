import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import "./form.css";

class SignupForm extends Component {
  constructor() {
      super();
      this.state = {
                      name:              "",
                      email:             "",
                      password:          "",
                      confirmPassword:   "",
                      recaptchaResponse: "",
                      inputFields:       [
                                            { name: "name", type:"name", placeholder: "Your name" },
                                            { name: "email", type:"email", placeholder: "Your email" },
                                            { name: "password", type:"password", placeholder: "Select password" },
                                            { name: "confirmPassword", type:"password", placeholder: "Confirm your password" },
                                          ]
                    }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.processSignupForm = this.processSignupForm.bind(this);
      this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
    }

    handleInputChange(e) {
      e.preventDefault()
      const name   = e.target.name
      const value  = e.target.value
      this.setState({ [name]: value })
    }

    processSignupForm(e) {
      e.preventDefault();
      if (this.state.recaptchaResponse) {
        let newUserInfo = {
                            name:            this.state.name,
                            email:           this.state.email,
                            password:        this.state.password,
                            confirmPassword: this.state.confirmPassword,
                          }
        console.log(newUserInfo)
        this.setState({
                        name:           "",
                        email:          "",
                        password:       "",
                        confirmPassword:""
                      })
        this.props.processSignupForm(newUserInfo)
      }
    }

    onRecaptchaChange(response) {
      this.setState({ recaptchaResponse: response });
  }

  renderSignupForm() {
    return(
      <form onSubmit={ this.processSignupForm }>
        {
          this.state.inputFields.map((field, idx) => {
            let labelName = `${ field.name.charAt(0).toUpperCase() }${ field.name.slice(1) }`
            return(
              <div className="row" key={ idx }>
                <div className="col-sm-4">
                  <label>{ labelName }<span className="red-text">*</span></label>
                </div>
                <div className="col-sm-8">
                  <input
                    type={ field.type }
                    name={ field.name }
                    required="required"
                    placeholder={ field.placeholder }
                    onChange={ this.handleInputChange }
                    value={ this.state[field] }
                  />
                </div>
              </div>
            )
          })
        }
        <div className="row justify-content-center">
          <ReCAPTCHA
            ref     = "recaptcha"
            sitekey = { process.env.REACT_APP_SITE_KEY }
            onChange= { this.onRecaptchaChange }/>
        </div>
        <div className="row justify-content-center">
          <button className="footer-btn submit" type="submit">Create account</button>
        </div>
      </form>
    )
  }

  render() {
    return (
      <div>
        { this.renderSignupForm() }
      </div>
    )
  }
}

export default SignupForm;
