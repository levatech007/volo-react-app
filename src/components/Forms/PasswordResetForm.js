import React, { Component } from "react";
import Auth from "j-toker";
import Alert from "../Alert/Alert.js";
import Modal from "../Modal/Modal.js";
import "./form.css";

class PasswordResetForm extends Component {
  constructor(){
    super();
    this.state = {
                    email:        "",
                    sentToEmail:  "",
                    alert:        false,
                    alertMessage: "",
                    formSubmitted:    false,
                    alertStyle:   "",
                }
    this.onEmailInputChange     = this.onEmailInputChange.bind(this);
    this.handlePasswordReset    = this.handlePasswordReset.bind(this);
    this.showPasswordChangeForm = this.showPasswordChangeForm.bind(this);
    this.showSentConfirmation   = this.showSentConfirmation.bind(this);
  }

  onEmailInputChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordReset(e) {
    e.preventDefault();
    Auth.requestPasswordReset({
     email: this.state.email,
    })
    .then((resp) => {
                       this.setState({
                                       sentToEmail:   this.state.email,
                                       email:         "",
                                       formSubmitted: true,
                                       alert:         true,
                                       alertStyle:    "alert-box ok",
                                       alertMessage:  "Success!",
                                     });
     })
     .fail((resp) => {
                       this.setState({
                                       sentToEmail:   "",
                                       email:         "",
                                       formSubmitted: false,
                                       alert:         true,
                                       alertStyle:    "alert-box error",
                                       alertMessage:  resp.data.errors,
                                     });
     })
   }

   showPasswordChangeForm() {
     return(
           <form>
             <div className="row">
               <div className="col-sm-4">
                 <label>Email<span className="red-text">*</span></label>
               </div>
               <div className="col-sm-8">
                 <input
                   type       = "email"
                   placeholder= "Your email"
                   onChange   = { this.onEmailInputChange }
                 />
               </div>
             </div>
           </form>
     )
   }

   showSentConfirmation() {
     return(
       <div className="row justify-content-center">
         <div className="col-sm-10">
           <p>Please check you email for further instructions on how you can change your password.</p>
        </div>
       </div>
     )
   }

  render() {
    return(
      <div>
        { this.state.alert ? <Alert style={ this.state.alertStyle } alert={this.state.alertMessage}/> : null }
        <Modal
          form={ this.state.formSubmitted ? this.showSentConfirmation() : this.showPasswordChangeForm()}
          title={ "Reset Your Password" }
          close={ this.props.close }
          submit={ this.handlePasswordReset }
        />
      </div>
    )
  }
}

export default PasswordResetForm;
