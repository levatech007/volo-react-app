import React, { Component } from "react";
import $ from "jquery";
import ReCAPTCHA from "react-google-recaptcha";

class ContactModal extends Component {
  constructor(){
    super();
    this.state = {
      message: {
        name: "",
        email: "",
        body: "",
      },
      recaptchaResponse: "",
      error: false,
      submitted: false
    }
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onBodyInputChange = this.onBodyInputChange.bind(this);
    this.onFormSubmit= this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onNameInputChange(e) {
    this.setState({
      message: {
        name: e.target.value,
        email: this.state.message.email,
        body: this.state.message.body,
      }
    })
  }

  onEmailInputChange(e) {
    this.setState({
      message: {
        name: this.state.message.name,
        email: e.target.value,
        body: this.state.message.body,
      }
    })
  }

  onBodyInputChange(e) {
    this.setState({
      message: {
        name: this.state.message.name,
        email: this.state.message.email,
        body: e.target.value
      }
    })
  }

  // add validations

  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.recaptchaResponse) {
      $.post({
        url: `${process.env.REACT_APP_BACKEND_URL}/message`,
        data: {
          message: this.state.message
        },
        success: (response) => {
          console.log(response)
          this.setState({
            message: {
              name: "",
              email: "",
              body: ""
            },
            recaptchaResponse: "",
            error: false,
            submitted: true,
          })
        },
        error: (error) => {
          console.log(error)
          this.setState({
            message: {
              name: "",
              email: "",
              body: "",
            },
            recaptchaResponse: "",
            error: true,
            submitted: false,
          })
        }
      })
    } else {

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
                {
                  this.state.message.submitted ?
                  <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="alert alert-success" role="alert">Thank you for your submission</div>
                    </div>
                  </div>
                : (
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
                            placeholder="Your name"
                            onChange={this.onNameInputChange}
                            value= { this.state.message.name }
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
                            value={ this.state.message.email }
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Message<span className="red-text">*</span></label>
                        <div className="col-sm-9">
                          <textarea
                            rows="4"
                            name="body"
                            placeholder="Your message here"
                            onChange={this.onBodyInputChange}
                            value={ this.state.message.body }
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
                            value="Submit"
                          />
                          <button type="button" className="btn" onClick={ this.props.close }>Cancel</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> )
              }
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ContactModal;
