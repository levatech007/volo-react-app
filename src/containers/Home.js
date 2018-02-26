import React, { Component } from "react";
import Logo from "../images/logo.png"

class Home extends Component {
  render() {
    return (
          <img className="logo" src={ Logo } alt="logo"/>
    );
  }
}

export default Home;
