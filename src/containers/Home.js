import React, { Component } from "react";
import Logo     from "../images/logo.png"
import HomeData from "../static-data/homepage.json";
import "./styles/airplane-animations.css";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="hero-animation">
          <img className="logo" src={ Logo } alt="logo"/>
          <div className="flight run"></div>
	           <div className="runway">
	         </div>
        </div>
        <div className="row justify-content-center info">
          <div className="col-md-8 col-8">
            <div className="row justify-content-center intro">
                <p>VOLO is an app for avid planespotters. </p>
            </div>
            <div className="row justify-content-center">
              {
                HomeData.icons.map((icon, idx) => {
                  return(
                    <div className="col-md-4 col-8" key={ idx }>
                      <img src={ require(`../images/homepage-icons/${ icon.name }-icon.svg`) } alt="airplane" />
                      <p>{ icon.description }</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default Home;
