import React, { Component } from "react";
import Auth                 from "j-toker";
import Alert                from "../Alert/Alert.js";
import Modal                from "../Modal/Modal.js";
import "./form.css";

class ProfileUpdateForm extends Component {
  constructor() {
    super();
    this.state = {
                    inputFields:  ["email", "name"],
                    email:        "",
                    name:         "",
                    showAlert:    false,
                    alertStyle:   "",
                    alertMessages: ""
                  }
    this.handleInputChange       = this.handleInputChange.bind(this);
    this.renderUpdateProfileForm = this.renderUpdateProfileForm.bind(this);
    this.onFormSubmit            = this.onFormSubmit.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault()
    const name    = e.target.name
    const value   = e.target.value
    this.setState({ [name]: value })
  }

  renderUpdateProfileForm() {
    return(
          <form onSubmit={ this.onFormSubmit }>
            { this.state.showAlert ? <Alert alertStyle={ this.state.alertStyle } alert={this.state.alertMessages}/> : null }
            {
              this.state.inputFields.map((field, idx) => {
                let labelName = `${field.charAt(0).toUpperCase()}${field.slice(1)}`
                return(
                  <div className="row" key={ idx }>
                    <label className="col-sm-4">{ labelName }</label>
                    <div className="col-sm-8">
                      <input
                        type       = { (field === 'email') ? "email" : "text" }
                        name       = { field }
                        placeholder= { `Your ${ field }` }
                        onChange   = { this.handleInputChange }
                        value      = { this.state[field] }
                      />
                    </div>
                  </div>
                )
              })
            }
          </form>
    )
  }

  onFormSubmit(e) {
    e.preventDefault();
    Auth.updateAccount({
      name: this.state.name,
      email: this.state.email,
    })
    .then((resp) => {
      console.log(resp)
      this.setState({
        name: "",
        email: "",
        showAlert: true,
        alertStyle: "alert-box ok",
        alertMessages: ["Successfully updated account"]
        // msg: `Updated info to ${ resp.data.email } ${ resp.data.name }`
      });
    }).fail((resp) => {
      console.log(resp)
      // need error handling if the email user wants to change to already exists in db.
      // currently return error:
      // {reason: "Failed to update user account", data: {…}}
      //   data:
      //   error: "Internal Server Error"
      //   exception: "#<ActiveRecord::RecordNotUnique: PG::UniqueViolation: ERROR:  duplicate key value violates unique constraint "index_users_on_email"↵DETAIL:  Key (email)=(evaliisagalen@gmail.com) already exists.↵: UPDATE "users" SET "email" = $1, "uid" = $2, "updated_at" = $3 WHERE "users"."id" = $4>"
      //   status: 500
      //   traces: {Application Trace: Array(0), Framework Trace: Array(117), Full Trace: Array(117)}
      //   __proto__: Object
      //   reason: "Failed to update user account"
      //   __proto__: Object
      // }
      this.setState({
        name: "",
        email: "",
        showAlert: true,
        alertStyle: "alert-box error",
        alertMessages: ["Something went wrong"]
      })
    });
  }

  render() {
    return(
      <Modal
        content={ this.renderUpdateProfileForm() }
        close={ this.props.close }
        submit={ this.onFormSubmit }
        title="Edit Profile"
      />
    )
  }
}

export default ProfileUpdateForm;
