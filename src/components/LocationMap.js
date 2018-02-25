import React, { Component } from "react"
import GoogleMapReact from 'google-map-react'
// import LocationMarker from "../components/LocationMarker.js"


class LocationMap extends Component {
  constructor() {
    super();
    this.state = {
      center: [37.6040697, -122.3734245],
      zoom: 11,
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState
  }

  render() {
    return (
      <GoogleMapReact
       center={this.state.center}
       zoom={this.state.zoom}>
       <div className="marker" lat={37.6040697} lng={-122.3734245}></div>
     </GoogleMapReact>
    );
  }
}
export default LocationMap;
