import React, { Component } from 'react';
import LocationsDropdown from "../components/LocationsDropdown.js"

class Locations extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center background">
          {/* add image */}
          <h1>Select location</h1>
          <LocationsDropdown />
        </div>
      </div>
    );
  }
}

export default Locations;
