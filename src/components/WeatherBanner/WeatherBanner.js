import React, { Component } from "react"

import "./weather-banner.css"

class WeatherBanner extends Component {
  constructor() {
      super();
      this.state = {
        showExtendedContent: false,
        weatherBannerClass: "weather-banner",
        extendedContentClass: "extended-weather-banner",
      }
      this.renderExtendedContent = this.renderExtendedContent.bind(this)
      this.toggleExtendedContent = this.toggleExtendedContent.bind(this)
  }

  renderExtendedContent() {
    return(
      <div className={ this.state.extendedContentClass }>
        <p>Notes:</p>
        <textarea />
      </div>
    )
  }

  toggleExtendedContent() {
    this.setState({
      showExtendedContent: !this.state.showExtendedContent,
     })
    if(this.state.showExtendedContent) {
      this.setState({
        weatherBannerClass: "weather-banner slide-up",
          extendedContentClass: "extended-weather-banner fade-out",
       })
    } else {
      this.setState({
        weatherBannerClass: "weather-banner slide-down",
        extendedContentClass: "extended-weather-banner fade-in",
       })
    }
  }

  render() {
    return(
      <div
        className={ this.state.weatherBannerClass }
        style={{ backgroundColor: "#B0E0E6" }}
      >
        <div className="weather-icon">
          <img src={ require("./weather-icons/clear.svg") }/>
        </div>
        <div className="temp">75F/47F</div>
        <div className="weather-details">
          <ul>
            <li>Wind: NW 8mph</li>
            <li>Humidity: 57%</li>
          </ul>
        </div>
        <div className="add-button">
          <button onClick={ this.toggleExtendedContent } className="plain-button add-btn">
            { this.state.showExtendedContent ? "-" : "+" }
          </button>
        </div>
        { this.state.showExtendedContent && this.renderExtendedContent() }
      </div>
    )
  }
}

export default WeatherBanner
