import React, { Component } from "react";
import Auth from "j-toker";

class ChangePasswordModal extends Component {
  constructor(){
    super();
    this.state = {
        email: "",
        sentEmail: "",
        error: false,
        errorMsg: "",
        submitted: false
    }
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onFormSubmit= this.onFormSubmit.bind(this);
  }

  onEmailInputChange(e) {
    this.setState({
        email: e.target.value,
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    Auth.requestPasswordReset({
     email: this.state.email,
   })
     .then((resp) => {
       this.setState({
         sent_email: this.state.email,
         email: "",
         submitted: true,
         error: false,
         errorMsg: "",
       });
     }).fail((resp) => {
       this.setState({
         sent_email: "",
         email: "",
         submitted: false,
         error: true,
         errorMsg: resp.data.errors,
       });
     })
   }

  render() {
    return(
      <div className="modal fade show" style={{display: 'block'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Request Password Reset</h5>
              <button type="button" className="close" onClick={ this.props.close }>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row justify-content-center">
                <div className="col-md-12 contact-form">
                  <form onSubmit={ this.onFormSubmit } className="forms">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Email<span className="red-text">*</span></label>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your email"
                          onChange={this.onEmailInputChange}
                        />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChangePasswordModal;
