import React, { Component } from "react";

class OauthProviderButton extends Component {
  constructor() {
    super();
    this.onOauthButtonSubmit = this.onOauthButtonSubmit.bind(this);
  }

  onOauthButtonSubmit() {
    this.props.onOauthLogin(this.props.provider.toLowerCase())
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-light oauth-button"
            onClick={ this.onOauthButtonSubmit }
            disabled
          >
            Sign in with { this.props.provider }
          </button>
        </div>
      </div>
    )
  }
}

export default OauthProviderButton
