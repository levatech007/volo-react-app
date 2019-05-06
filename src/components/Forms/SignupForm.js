import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Alert     from "../Alert/Alert.js";
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
                                          ],
                      showAlert: false,
                      alertMessages: [],
                    }
      this.handleInputChange  = this.handleInputChange.bind(this);
      this.validateFormInputs = this.validateFormInputs.bind(this);
      this.processSignupForm  = this.processSignupForm.bind(this);
      this.onRecaptchaChange  = this.onRecaptchaChange.bind(this);
    }

    handleInputChange(e) {
      e.preventDefault()
      const name   = e.target.name
      const value  = e.target.value
      this.setState({ [name]: value })
    }

    validateFormInputs() {
      let alertMessages = []
      let formIsValid = true
      if (!this.state.name) {
        formIsValid = false
        alertMessages.push("Name must be present.")
      }
      const validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!validEmailPattern.test(this.state.email)) {
        formIsValid = false
        alertMessages.push("Email is not valid.")
      }
      if (this.state.password !== this.state.confirmPassword) {
        formIsValid = false
        alertMessages.push("Your passwords don't match.")
      }
      this.setState({ alertMessages: alertMessages })

      return formIsValid
    }

    processSignupForm(e) {
      e.preventDefault();
      if(this.validateFormInputs()) {
        if (this.state.recaptchaResponse) {
          let newUserInfo = {
                              name:            this.state.name,
                              email:           this.state.email,
                              password:        this.state.password,
                              confirmPassword: this.state.confirmPassword,
                            }
          this.setState({
                          name:           "",
                          email:          "",
                          password:       "",
                          confirmPassword:""
                        })
          this.props.processSignup(newUserInfo)
        } else {
          this.setState({
            showAlert: true,
            alertMessages: ["Something went wrong with Recaptcha. Please refresh the page and try again."]
          })
        }
      } else {
        this.setState({ showAlert: true })
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
        { this.state.showAlert ? <Alert alert={ this.state.alertMessages } alertStyle="alert-box error" /> : null}
        { this.renderSignupForm() }
      </div>
    )
  }
}

export default SignupForm;
