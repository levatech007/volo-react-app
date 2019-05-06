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
                    alertMessages: [],
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
    const validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(this.state.email && validEmailPattern.test(this.state.email)) {

        Auth.requestPasswordReset({
         email: this.state.email,
        })
        .then((resp) => {
                           this.setState({
                                           sentToEmail:   this.state.email,
                                           email:         "",
                                           formSubmitted: true,
                                           alertStyle: "alert-box ok",
                                           alertMessages: ["Thank you! Your request has been submitted. Please check your email for further instructions."]
                                         });
         })
         .fail((resp) => {
                           this.setState({
                                           email:         "",
                                           alert:         true,
                                           alertStyle:    "alert-box error",
                                           alertMessages:  resp.data.errors,
                                         });
          })
    } else { // no email present
      this.setState({
                      email:         "",
                      alert:         true,
                      alertStyle:    "alert-box error",
                      alertMessages:  ["Please enter a valid email."],
                    });
    }
  }

   showPasswordChangeForm() {
     return(
           <form>
             <div className="row">
               { this.state.alert ? <Alert alertStyle={ this.state.alertStyle } alert={this.state.alertMessages}/> : null }
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
         <Alert alertStyle={ this.state.alertStyle } alert={this.state.alertMessages}/>
       </div>
     )
   }

  render() {
    return(
        <Modal
          form={ this.state.formSubmitted ? this.showSentConfirmation() : this.showPasswordChangeForm()}
          title={ "Reset Your Password" }
          close={ this.props.close }
          submit={ this.handlePasswordReset }
        />
    )
  }
}

export default PasswordResetForm;
