import React, { Component } from "react"
import WeatherData          from "./weather-data.json"
import Alert                from "../Alert/Alert.js"
import "./banner.css";
import "./weather-banner.css";

class WeatherBanner extends Component {
  constructor() {
      super();
      this.state = {
        weatherStyles:          {},
        showExtendedContent:    false,
        weatherBannerClass:     "banner",
        extendedContentClass:   "extended-banner",
        calendarNotesField:     "",
        calendarEntrySubmitted: false,
        alertMessages:          [],
        alertStyle:             "",
      }
      this.onNotesChange         = this.onNotesChange.bind(this)
      this.renderExtendedContent = this.renderExtendedContent.bind(this)
      this.toggleExtendedContent = this.toggleExtendedContent.bind(this)
      this.onCalendarEntrySubmit = this.onCalendarEntrySubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ weatherStyles: WeatherData[this.props.oneDay.conditions_icon] })
  }

  onNotesChange(e) {
    e.preventDefault()
    this.setState({ calendarNotesField: e.target.value })
  }

  onCalendarEntrySubmit() {
    this.props.submitEntry(this.props.oneDay, this.state.calendarNotesField)
    this.setState({
      calendarEntrySubmitted: true,
      alertMessages: ["Added to your calendar"],
      alertStyle: "alert-box ok"
    })
  }

  renderExtendedContent() {
    if(this.state.calendarEntrySubmitted) {
      return(
        <Alert
          alert={ this.state.alertMessages }
          alertStyle={ this.state.alertStyle }
        />
      )
    } else {
      return(
        <div className={ this.state.extendedContentClass }>
          <div className="extended-left">
            <textarea
              name="calendarNotesField"
              rows="3"
              placeholder="Your notes here"
              required="required"
              onChange={ this.onNotesChange}
              value={ this.state.calendarNotesField }
            />
          </div>
          <div className="extended-right">
            <button
              className="add-btn"
              onClick={ this.onCalendarEntrySubmit }
            >
              Add to my calendar
            </button>
          </div>
        </div>
      )
    }
  }

  toggleExtendedContent() {
    this.setState({
      showExtendedContent: !this.state.showExtendedContent,
     })
    if(this.state.showExtendedContent) {
      this.setState({
        weatherBannerClass: "banner slide-up",
          extendedContentClass: "extended-banner fade-out",
       })
    } else {
      this.setState({
        weatherBannerClass: "banner slide-down",
        extendedContentClass: "extended-banner fade-in",
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
          <img
            src={ require(`./weather-icons/${ this.props.oneDay.conditions_icon }.svg`) }
            alt={ this.props.oneDay.conditions_icon }
          />
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
