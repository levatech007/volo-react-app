import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";


class GoogleMaps extends Component {
  render() {
    return (
      <Map google={this.props.google}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.long
          }}
          zoom={12}
          onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GMAPS_API_KEY)
})(GoogleMaps)
