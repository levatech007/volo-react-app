import React, { Component } from "react";
import Logo     from "./Images/volo-logo.svg";
import Navbar   from "../../components/Navbar/Navbar.js";
import "./Styles/airplane-animation.css";
import "./Styles/homepage.css";

class HomePage extends Component {
  render() {
    return (
      <div className="home-screen">
        <Navbar />
        <div className="animation-div">
          <div className="logo-div"><img src={ Logo } alt="logo"/></div>
          <div className="skyline"></div>
          <div className="aircraft animate"></div>
        </div>
    </div>
    );
  }
}

export default HomePage;
