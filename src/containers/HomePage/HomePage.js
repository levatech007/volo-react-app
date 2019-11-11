import React, { Component } from "react";
import { Link }             from "react-router-dom";
import Logo                 from "./Images/volo-logo.svg";
import HomeData             from "../../static-data/homepage.json";
import "./Styles/airplane-animation.css";
import "./Styles/homepage.css";

class HomePage extends Component {
  render() {
    return (
      <div className="hero-page">
        <div className="home-screen">
          <div className="animation-div">
            <div className="logo-div">
              <img src={ Logo } alt="logo"/>
            </div>
            <div className="skyline"></div>
            <div className="aircraft animate"></div>
          </div>
        </div>
          <div className="row justify-content-center info">
            <div className="col-md-8 col-10">
              <div className="row justify-content-center">
                <div className="col-12 intro">
                  <h4>{ HomeData.title }</h4>
                  <div className="row justify-content-center"><Link to={ "/login" } className="join-btn">JOIN NOW</Link></div>
                </div>
              </div>
              <div className="row justify-content-center">
                {
                  HomeData.icons.map((icon, idx) => {
                    return(
                      <div className="col-md-4 col-8" key={ idx }>
                        <img src={ require(`./Images/${ icon.name }-icon.svg`) } alt="airplane" />
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

export default HomePage
