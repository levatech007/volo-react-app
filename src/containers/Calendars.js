import React, { Component } from 'react';
import Accordion from "../components/Accordion.js"

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
    let location = this.state.selectedLocation
    fetch(`http://api.wunderground.com/api/562b8535169e745a/forecast/q/${location}.json`)
      .then((res) => {
        return res.json();
      }).then((forecast) => {
        let fourDayForecast = forecast.forecast.simpleforecast.forecastday;
        console.log(fourDayForecast)
        this.setState({ weatherForecast: fourDayForecast })
      });
  }

  createCalendarEntry(entry, notes) {
    console.log(entry)
    console.log(notes)
    // fetch("http://localhost:8000/calendars", {
    //   method: "POST",
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     // add entry here
    //   })
    // }).then((res) => {
    //   return res.json()
    // }).then((json) => {
      //go to profile page?
    // })
  }

  render() {
    return (
      <div className="container">
        <div className="row background">
          {/* location.js */}
          <Accordion createCalendarEntry={ this.createCalendarEntry } forecast={ this.state.weatherForecast}/>
        </div>
      </div>
    )
  }
}

export default Calendars;
