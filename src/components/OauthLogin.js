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
      <div>
        {
          this.state.providers.map((provider, idx) => {
            return(
              <OauthProviderButton provider={ provider } key={ idx }/>
            )
          })
        }
      </div>
    )
  }
}

export default OauthLogin
