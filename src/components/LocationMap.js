import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class LocationMap extends Component {
  constructor() {
    super();
    this.state = {
      center: [],
      zoom: 11,
    }
  }

  componentDidMount() {
    let lat = parseFloat(this.props.lat)
    let long = parseFloat(this.props.long)
    this.setState({ center: [lat, long] })
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
