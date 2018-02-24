import React, { Component } from "react";

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
    fetch('http://localhost:8000/locations')
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
      selectedAirportCode: e.target.airportValue,
    });
  }

  onClickAboutLocations() {
    this.props.history.push(`/locations/${this.state.selectedLocationId}`)
  }

  onSelectCalendarEntry(e) {
    e.preventDefault();
    console.log(this.state.selectedAirportCode)
    // this.props.history.push(`/calendars/${this.state.selectedAirportCode}`)
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center background">
          <div className="col-6">
            <h2>Where do you want to go?</h2>
            <select onChange={ this.handleLocationChange } className="form-control form-control-lg">
              { this.state.locations.map((location, idx) => {
                return(
                  <option value={location.id} airportValue={ location.airport } key={idx}>{location.name} @ {location.airport}</option>
                  )
                })
              }
            </select>
            <div className="row">
              <div className="col-6">
                <div className="row justify-content-center">
                  <button onClick={ this.onClickAboutLocations } className="btn btn-light button-margin">About Location</button>
                </div>
              </div>
              <div className="col-6">
                <div className="row justify-content-center">
                  <button onClick={ this.onSelectCalendarEntry } className="btn btn-light button-margin">Select entry</button>
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
