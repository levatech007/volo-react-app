import React, { Component } from 'react';
import $ from "jquery";
import Accordion from "../components/Accordion.js";

class Calendars extends Component {
  constructor(){
    super();
    this.state = {
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
      let airportCode = location.airport
      // fetch(`http://api.wunderground.com/api/562b8535169e745a/forecast/q/${airportCode}.json`)
      fetch(`http://api.wunderground.com/api/562b8535169e745a/forecast/q/SFO.json`)
      // fetch("http://api.wunderground.com/api/562b8535169e745a/geolookup/q/SFO.json")
        .then((res) => {
          return res.json();
        }).then((forecast) => {
          console.log(forecast)
          let fourDayForecast = forecast.forecast.simpleforecast.forecastday;

          this.setState({ weatherForecast: fourDayForecast })
        });
  })
}

  createCalendarEntry(entry, notes) {
    console.log(entry)
    console.log(notes)
    //Post to db with user_id
  }

  render() {
    return (
      <div className="container">
        <div className="row background">
          <Accordion createCalendarEntry={ this.createCalendarEntry } forecast={ this.state.weatherForecast}/>
        </div>
      </div>
    )
  }
}

export default Calendars;
