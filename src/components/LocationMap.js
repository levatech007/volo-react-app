import React, { Component } from "react"
import GoogleMapReact from 'google-map-react'

class LocationMap extends Component {
  constructor() {
    super();
    this.state = {
      center: [33.9531115, -118.3968193],
      zoom: 11,
    }
  }

  componentDidMount() {
    console.log([this.props.long, this.props.lat]);
  }

  render() {
    return (
      <GoogleMapReact
       bootstrapURLKeys={{ key: ["AIzaSyC4wUKLfz6k3UQwAZNHx5tUccY3UL2VvYI"] }}
       center={ this.state.center }
       zoom={ this.state.zoom }>
       <div className="marker" lat={ this.state.center[0] } lng={ this.state.center[1] }></div>
     </GoogleMapReact>
    );
  }
}

export default LocationMap;
