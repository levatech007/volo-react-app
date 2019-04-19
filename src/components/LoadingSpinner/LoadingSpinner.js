import React, { Component } from "react";
import EngineSpinner from "../../images/engine-spinner-with-fill.png";
import "./loading-spinner.css";

class LoadingSpinner extends Component {

  render() {
    return(
      <div className="screen">
        <div className="window">
          <div className="spinner">
            <img src={ EngineSpinner } alt="turbofan"/>
          </div>
        </div>
      </div>
    )
  }
}

export default LoadingSpinner
