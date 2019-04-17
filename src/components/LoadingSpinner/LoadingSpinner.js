import React, { Component } from "react";
import EngineSpinner from "../../images/engine-spinner.png";
import "./loading-spinner.css";

class LoadingSpinner extends Component {
  constructor() {
      super();
      this.state = {
        currentScreenHeight:  window.innerHeight,
        currentScreenWidth:   window.innerWidth,
        marginTop: 0,
        marginLeft: 0
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
      // calculate margins (window w or h - element w or h)/2

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
