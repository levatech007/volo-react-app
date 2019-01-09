import React, { Component } from "react";
import OauthProviderButton from "./OauthProviderButton.js";

class OauthLogin extends Component {
  constructor() {
    super();
    this.state = {
      providers: ["facebook", "google"],
      selectedProvider: ""
    }
  }

  render() {
    return(
      <div>Oauth Login</div>
    )
  }
}

export default OauthLogin
