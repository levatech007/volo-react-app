import React, { Component } from "react";
import HomeData from "../static-data/homepage.json";

class InfoSection extends Component {
  render() {
    return(
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
    )
  }
}

export default InfoSection
