import React, { Component } from 'react';
import $ from "jquery";
import Auth from "j-toker";
import Accordion from "../components/Accordion.js";
import Location from "../components/Location.js";

class Calendars extends Component {
  constructor(){
    super();
    this.state = {
      location: {},
      weatherForecast: [],
      selectedLocation: "SFO"
    }
    this.createCalendarEntry = this.createCalendarEntry.bind(this);
  }
  componentDidMount() {
    let locationId = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}.json`)
    .then((res) => {
      return res.json();
    }).then((location) => {
      this.setState({ location: location })
      fetch(`http://api.wunderground.com/api/562b8535169e745a/forecast/q/SFO.json`)
      .then((res) => {
        return res.json();
      }).then((forecast) => {
        console.log(forecast)
        let fourDayForecast = forecast.forecast.simpleforecast.forecastday;
        this.setState({ weatherForecast: fourDayForecast })
      })
    })
  }

  createCalendarEntry(entry, notes, weather) {
    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.post({
      url: `${process.env.REACT_APP_BACKEND_URL}/calendars`,
      data: {
        location: this.state.location.name,
        weekday: weather.date.weekday,
        day: weather.date.day,
        month: weather.date.monthname,
        notes: notes,
        icon_url: weather.icon_url,
      },
      success: (response) => {
        console.log(response)
      },
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row background">
          <Location location={ this.state.location } />
          <Accordion createCalendarEntry={ this.createCalendarEntry } forecast={ this.state.weatherForecast}/>
        </div>
      </div>
    )
  }
}

export default Calendars;
