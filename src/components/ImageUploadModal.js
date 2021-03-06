import React, { Component } from "react";
import $                    from "jquery";
import Auth                 from "j-toker";
import Alert                from "./Alert/Alert.js";

class ImageUploadModal extends Component {
  constructor() {
    super();
    this.state = {
                    selectedImage: null,
                    showAlert:     false,
                    alertStyle:    "",
                    alertMessage:  ""
                  }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFormSubmit      = this.onFormSubmit.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault()
    this.setState({ selectedImage: e.target.files[0] })
  }

  onFormSubmit(e) {
    e.preventDefault();
    let formPayLoad = new FormData();
    formPayLoad.append('avatar', this.state.selectedImage);

    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.post({
      url: `${process.env.REACT_APP_BACKEND_URL}/images`,
      processData: false,
      contentType: false,
      data:        formPayLoad,
      success: (resp) => {
        this.setState({
                        selectedImage: null,
                        showAlert:     true,
                        alertStyle:    "alert-box ok",
                        alertMessage:  "Photo uploaded successfully!"
                      })
      },
      error: (resp) => {
        this.setState({
                        selectedImage: null,
                        showAlert:     true,
                        alertStyle:    "alert-box error",
                        alertMessage:  "Oops...something went wrong!"
                      })
      }
    });
  }

  render() {
    return(
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Your Profile Image (Under Construction...)</h5>
                <button type="button" className="close" onClick={ this.props.close }>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              { this.state.showAlert ? <Alert alertStyle={ this.state.alertStyle } alert={this.state.alertMessage}/> : null }
              <div className="modal-body">
                <div className="row justify-content-center">
                  <div className="col-md-12 contact-form">
                    <form onSubmit={ this.onFormSubmit } className="forms">
                      <div className="form-group">
                        <label className="col-sm-3 col-form-label">Select file</label>
                        <div className="col-sm-9">
                          <input
                            type="file"
                            className="form-control-file"
                            onChange={ this.handleInputChange } />
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

export default ImageUploadModal;
