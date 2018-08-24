import React, { Component } from "react";
import LocationMarkerLg from "../images/location-marker-lg.svg";
import Alerts from "../components/Alerts.js"

class Locations extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      selectedLocationId: 0,
      selectedAirportCode: "",
      errors: "",
      alertStyle: "alert alert-danger",
    }
    this.onClickAboutLocations = this.onClickAboutLocations.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.onSelectCalendarEntry = this.onSelectCalendarEntry.bind(this);
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`)
        .then((res) => {
          return res.json();
        }).then((locations) => {
          this.setState({ locations: locations })
    });

    window.scrollTo(0, 0)
  }

  handleLocationChange(e) {
    this.setState({
      locations: this.state.locations,
      selectedLocationId: e.target.value,
      selectedAirportCode: e.target.value,
    });
  }

  onClickAboutLocations() {
    if(this.state.selectedLocationId) {
      this.props.history.push(`/locations/${this.state.selectedLocationId}`)
    } else {
      this.setState({errors: "Please select a location"})
    }
  }

  onSelectCalendarEntry(e) {
    e.preventDefault();
    this.props.history.push(`/weather/${this.state.selectedLocationId}`)
  }

  render() {
    return (
      <div className="container">
        { this.state.errors? <Alerts errors={ this.state.errors } style={ this.state.alertStyle } /> : null }
        <div className="row justify-content-center background">
          <div className="col-12">
          <div className="row justify-content-center">
              <img className="marker-lg" src={ LocationMarkerLg } alt="location-marker"/>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-8">
              <h2>Where do you want to go plane spotting?</h2>
              <select onChange={ this.handleLocationChange } className="form-control form-control-lg">
                <option defaultValue selected disabled>Choose your location</option>
                  { this.state.locations.map((location, idx) => {
                    return(
                      <option value={location.id} key={idx}>{location.name} @ {location.airport}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row justify-content-center">
              <button onClick={ this.onClickAboutLocations } className="btn btn-light button-margin">About Location</button>
              <button onClick={ this.onSelectCalendarEntry } className="btn btn-light button-margin">Weather report</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Locations;
