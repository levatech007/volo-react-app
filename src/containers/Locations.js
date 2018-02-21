import React, { Component } from "react";
import { Link } from "react-router-dom";
import LocationsDropdown from "../components/LocationsDropdown.js"


class Locations extends Component {
  constructor() {
    super();
    this.state = {
      calendar: false,
      weatherForecast: [],
      locations: [],
      currentAirport: "",
      currentLocation: ""
    }
  }

  componentWillMount() {
    fetch('https://volo-rails-api.herokuapp.com/locations')
        .then((res) => {
          return res.json();
        }).then((locations) => {
          console.log(locations)
          this.setState({ locations: locations })
    });
    console.log(this.state.locations)
    fetch('http://api.wunderground.com/api/562b8535169e745a/forecast/q/SFO.json')
      .then((res) => {
        return res.json();
      }).then((forecast) => {
        let fourDayForecast = forecast.forecast.simpleforecast.forecastday;
        console.log(fourDayForecast)
        this.setState({ weatherForecast: fourDayForecast })
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row background">
          <div className="col-12">
            <LocationsDropdown locations={ this.state.locations }/>
            <div className="row">
              <div className="col-6">
                <div className="row justify-content-center">
                  <button onClick={ this.hasClickedLocationInfoButton } className="btn btn-light button-margin">About Location</button>
                </div>
              </div>
              <div className="col-6">
                <div className="row justify-content-center">
                  <Link to={ '/calendars' } className="btn btn-light button-margin">Select entry</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Locations;
