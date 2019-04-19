import React, { Component } from "react";
import "./styles/airplane-animations.css";
import Logo from "../images/logo.png"
import Airplane from "../images/table-icons/departure-icon.svg"

class Home extends Component {
  render() {
    return (
        <div className="hero-animation">
          <img className="logo" src={ Logo } alt="logo"/>
          <div class="flight run"></div>
	           <div class="runway">
	            </div>
        </div>
    );
  }
}

export default Home;
