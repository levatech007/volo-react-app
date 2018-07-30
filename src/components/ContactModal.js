import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

class ContactModal extends Component {
  constructor(){
    super();
    this.state = {
      message: {
        name: "",
        email: "",
        text: "",
        recaptchaResponse: "",
        error: false,
        submitted: false
      }
    }
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onFormSubmit= this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onNameInputChange(e) {
    this.setState({
      message: {
        name: e.target.value,
        email: this.state.message.email,
        text: this.state.message.text,
      }
    })
  }

  onEmailInputChange(e) {
    this.setState({
      message: {
        name: this.state.message.name,
        email: e.target.value,
        text: this.state.message.text,
      }
    })
  }

  onTextInputChange(e) {
    this.setState({
      message: {
        name: this.state.message.name,
        email: this.state.message.email,
        text: e.target.value
      }
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.recaptchaResponse) {
      let message = this.state.message
      console.log(message)
      this.setState({
        message: {
          name: "",
          email: "",
          text: "",
          submitted: true
        }
      })
    } else {
      this.setState({
        message: {
          name: "",
          email: "",
          text: "",
          recaptchaResponse: "",
          error: true,
        }
      })
    }
  }

  onChange(response) {
    this.setState({
    recaptchaResponse: response
  });
}


  render() {
    return (
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Us</h5>
                <button type="button" className="close" onClick={ this.props.close }>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    {
                      this.state.message.error ? <div className="alert alert-danger" role="alert">Please fill in all the required fields</div> : null
                    }
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    {
                      this.state.message.submitted ? <div className="alert alert-success" role="alert">Thank you for your submission</div> : null
                    }
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-12 contact-form">
                    <form onSubmit={ this.onFormSubmit } className="forms">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Name<span className="red-text">*</span></label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Your last name"
                            onChange={this.onLastNameInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Email<span className="red-text">*</span></label>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Your email"
                            onChange={this.onEmailInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Message<span className="red-text">*</span></label>
                        <div className="col-sm-9">
                          <textarea
                            rows="4"
                            placeholder="Your message here"
                            onChange={this.onTextInputChange}
                            >
                            </textarea>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-9 offset-md-3">
                        <ReCAPTCHA
                          ref="recaptcha"
                          sitekey={ process.env.REACT_APP_SITE_KEY }
                          onChange={ this.onChange }/>
                        </div>
                      </div>
                      <div className="row justify-content-center submit-btn">
                        <div className="col-md-9 offset-md-3">
                          <input
                            type="submit"
                            className="btn btn-primary"
                            value="Submit your request"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={ this.props.close }>Close</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ContactModal;
