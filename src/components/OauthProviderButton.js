import React, { Component } from "react";

class OauthProviderButton extends Component {
  constructor() {
    super();
    this.state = {
      provider: ""
    }
  }

  render() {
    return(
      <button type="button" class="btn btn-light">Light</button>

    )
  }
}

export default OauthProviderButton
