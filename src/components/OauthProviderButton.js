import React, { Component } from "react";

class OauthProviderButton extends Component {

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-md-6">
          <button type="button" className="btn btn-light oauth-button">Sign in with { this.props.provider }</button>
        </div>
      </div>
    )
  }
}

export default OauthProviderButton
