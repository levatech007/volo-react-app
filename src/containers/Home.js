import React, { Component } from "react";
import VoloLogo from "../images/Volo_logo.png"
import Skyline from "../images/skyline.svg"

class Home extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <img className="logo" src={ VoloLogo } alt="logo"/>
        </div>
        <div className="row align-items-end">
          <img className="skyline" src={ Skyline } alt="skyline"/>
        </div>
      </div>
    );
  }
}

export default Home;
