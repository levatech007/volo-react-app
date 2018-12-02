import React, { Component } from "react";
import Alert from "./Alerts.js";

class UpdateProfileModal extends Component {
  constructor() {
    super();
    this.state = {
      inputFields: ["email", "name"],
      email: "",
      name: "",
      image: "",
      showAlert: false,
      alertStyle: "",
      alertMsg: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showUpdateProfileForm = this.showUpdateProfileForm.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault()
    const target = e.target
    const name = target.name
    const value = target.value
    this.setState({
      [name]: value
    })
  }

  showUpdateProfileForm() {
    return(
      <div className="row justify-content-center">
        <div className="col-md-12 contact-form">
          <form onSubmit={ this.onFormSubmit } className="forms">
          {
            this.state.inputFields.map((field, idx) => {
              let labelName = `${field.charAt(0).toUpperCase()}${field.slice(1)}`
              return(
                <div className="form-group row" key={ idx }>
                  <label className="col-sm-3 col-form-label">{ labelName }</label>
                  <div className="col-sm-9">
                    <input
                      type={ (field === 'email') ? "email" : "text" }
                      name={ field }
                      className="form-control"
                      placeholder={ `Your ${ field }` }
                      onChange={ this.handleInputChange }
                      value={ this.state[field] }
                    />
                  </div>
                </div>
              )
            })
          }
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Image</label>
            <div className="col-sm-9">
              <input type="file" className="form-control-file" onChange={ this.handleInputChange }/>
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
    )
  }

  onFormSubmit(e) {
    e.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      image: this.state.image
    }
    console.log(data);
  }

  render() {
    return(
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Your Account</h5>
                <button type="button" className="close" onClick={ this.props.close }>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              { this.state.showAlert ? <Alert style={ this.state.alertStyle } alert={this.state.alertMessage}/> : null }
              <div className="modal-body">
              { this.showUpdateProfileForm() }
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default UpdateProfileModal;
