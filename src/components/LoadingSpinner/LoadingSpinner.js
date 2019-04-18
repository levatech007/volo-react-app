import React, { Component } from "react";
import EngineSpinner from "../../images/engine-spinner-with-fill.png";
import "./loading-spinner.css";

class LoadingSpinner extends Component {
  constructor() {
      super();
      this.state = {
        currentScreenHeight:  window.innerHeight,
        currentScreenWidth:   window.innerWidth,
        marginTop: 0,
      }
      this.handleScreenDimensionsChange = this.handleScreenDimensionsChange.bind(this)
    }

  componentDidMount() {
    window.addEventListener("resize", this.handleScreenDimensionsChange);
    this.setState({
      currentScreenHeight: window.innerHeight,
      currentScreenWidth:  window.innerWidth,
    })
  }

  handleScreenDimensionsChange() {
      // get element width and height
      // get screen dimensions
      // div has a fixed height
      // calculate margins (window h - element h)/2


  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenDimensionsChange);
  }

  render() {
    return(
      <div className="screen">
        <div className="window">
          <div className="spinner">
            <img src={ EngineSpinner }/>
          </div>
        </div>
      </div>
    )
  }
}

export default LoadingSpinner
