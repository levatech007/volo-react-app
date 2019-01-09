import React, { Component } from "react";

class OauthProviderButton extends Component {

  render() {
    return(
      <div className="row justify-content-center">
        <button type="button" class="btn btn-light">Sign in with { this.props.provider }</button>
      </div>
    )
  }
}

export default OauthProviderButton
