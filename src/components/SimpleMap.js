import React, { Component } from "react"
import GoogleMapReact from 'google-map-react'


const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', background: 'red',
    height: 40, width: 40
  }}>
    {text}
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
    return (
       <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'I am here'}
        />
      </GoogleMapReact>
    );
  }
}
export default SimpleMap;
