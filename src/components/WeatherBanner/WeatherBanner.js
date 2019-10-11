import React, { Component } from "react"
import WeatherData          from "./weather-data.json"

import "./weather-banner.css"

class WeatherBanner extends Component {
  constructor() {
      super();
      this.state = {
        weatherStyles: {},
        showExtendedContent: false,
        weatherBannerClass: "weather-banner",
        extendedContentClass: "extended-weather-banner",
      }
      this.renderExtendedContent = this.renderExtendedContent.bind(this)
      this.toggleExtendedContent = this.toggleExtendedContent.bind(this)
  }

  componentDidMount() {
    this.setState({ weatherStyles: WeatherData[this.props.oneDay.conditions_icon] })
  }

  renderExtendedContent() {
    return(
      <div className={ this.state.extendedContentClass }>
        <div className="extended-left">
          <textarea
            placeholder="Add notes..."
          />
        </div>
        <div className="extended-right">
          <button className="add-btn">Add to my calendar</button>
        </div>
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
        style={{
          background: this.state.weatherStyles.backgroundFallback,
          background: this.state.weatherStyles.backgroundWebkit,
          background: this.state.weatherStyles.background,
          color: this.state.weatherStyles.fontColor
        }}
      >
        <div className="weather-icon">
          <img src={ require(`./weather-icons/${ this.props.oneDay.conditions_icon }.svg`) }/>
        </div>
        <div className="temp">{ this.props.oneDay.high_temp}F/{ this.props.oneDay.low_temp }F</div>
        <div className="weather-details">
          <ul>
            <li><h3>{ this.props.oneDay.day_of_week }, { this.props.oneDay.month } { this.props.oneDay.day }</h3></li>
            <li>Wind: { this.props.oneDay.wind_dir } { this.props.oneDay.wind_speed }mph</li>
            {/* <li>Humidity: 57%</li> */}
          </ul>
        </div>
        <div className="expand-button">
          <button onClick={ this.toggleExtendedContent } className="plain-button expand-btn">
            { this.state.showExtendedContent ? "-" : "+" }
          </button>
        </div>
        { this.state.showExtendedContent && this.renderExtendedContent() }
      </div>
    )
  }
}

export default WeatherBanner
