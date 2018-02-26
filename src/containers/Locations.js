import React, { Component } from "react";
import LocationMarkerLg from "../images/location-marker-lg.svg";

class Locations extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      selectedLocationId: 0,
      selectedAirportCode: ""
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
          console.log(locations)
          this.setState({ locations: locations })
    });
  }

  handleLocationChange(e) {
    this.setState({
      locations: this.state.locations,
      selectedLocationId: e.target.value,
      selectedAirportCode: e.target.value,
    });
  }

  onClickAboutLocations() {
    this.props.history.push(`/locations/${this.state.selectedLocationId}`)
  }

  onSelectCalendarEntry(e) {
    e.preventDefault();
    console.log(this.state.selectedAirportCode)
    this.props.history.push(`/calendars/${this.state.selectedLocationId}`)
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center background">
          <div className="row justify-content-center">
            <div className="col-6">
              <img className="marker-lg" src={ LocationMarkerLg }/>
              <h2>Where do you want to go planespotting?</h2>
              <select onChange={ this.handleLocationChange } className="form-control form-control-lg">
                <option defaultValue selected disabled>Choose your location</option>
                { this.state.locations.map((location, idx) => {
                  return(
                    <option value={location.id} key={idx}>{location.name} @ {location.airport}</option>
                    )
                  })
                }
              </select>
              <div className="row">
                <div className="col-sm-6">
                  <div className="row justify-content-center">
                    <button onClick={ this.onClickAboutLocations } className="btn btn-light button-margin">About Location</button>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="row justify-content-center">
                    <button onClick={ this.onSelectCalendarEntry } className="btn btn-light button-margin">Weather report</button>
                  </div>
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
