import React, { Component } from 'react';
import $ from "jquery";
import Auth from "j-toker";
import Location from "../components/Location.js";
import { Accordion } from "react-accessible-accordion";
import SingleDayWeather from "../components/SingleDayWeather.js"
import "react-accessible-accordion/dist/minimal-example.css";

class Weather extends Component {
  constructor(){
    super();
    this.state = {
      location: {},
      weatherForecast: [],
      userId: 0,
      reviewCount: 0,
    }
    this.createCalendarEntry = this.createCalendarEntry.bind(this);
  }

  componentWillMount() {
    Auth.validateToken()
    .then((user) => {
      this.setState({
        userId: user.id,
      })
    })
  }

  componentDidMount() {
    let locationId = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}.json`)
    .then((res) => {
      return res.json();
    }).then ((location) => {
      this.setState({
        location: location,
        reviewCount: location.reviews.length,
       })
    })
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}/weather.json`)
    .then((res) => {
      return res.json();
    }).then((forecast) => {
      console.log(forecast)
      this.setState({ weatherForecast: forecast.forecast })
    })
  }

  createCalendarEntry(oneDay, notes) {
    console.log(oneDay)
    console.log(notes)

    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.post({ // still need be set up
      url: `${process.env.REACT_APP_BACKEND_URL}/calendars`,
      data: {
        location: this.state.location.name,
        weekday: oneDay.day_of_week,
        day: oneDay.day,
        month: oneDay.month,
        notes: notes,
      },
      success: (response) => {
          this.props.history.push(`/users/${this.state.userId}`)
      },
      error: (response) => {
        console.log("error")
        // ADD ALERT that user must be logged in
      }
    })
  }

  render() {
    console.log(this.state.weatherForecast)
    return (
      <div className="container">
        <div className="row background">
          <div className="col-md-12">
            { this.state.location.latitude && <Location location={ this.state.location } reviewCount={ this.state.reviewCount}/> }
            { this.state.weatherForecast[0] &&
              <Accordion>
                {this.state.weatherForecast.map((oneDay, idx) => {
                  if (idx < 5) {
                    return (
                       <SingleDayWeather userId={this.state.userId} oneDay={ oneDay } idx={ idx } createCalendarEntry={ this.createCalendarEntry } key={ idx }/>
                     )
                   }
                    })
                  }
                </Accordion>
              }
            </div>
          </div>
      </div>
    )
  }
}

export default Weather;
