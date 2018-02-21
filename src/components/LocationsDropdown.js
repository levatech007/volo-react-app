import React, { Component } from 'react';

class LocationsDropdown extends Component {

  render() {
    return (
        <div class="btn-group">
          <button class="btn btn-light btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select location
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Millbrae @ SFO</a>
            <a class="dropdown-item" href="#">Lincoln Ave @ LAX</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
    )
  }
}

export default LocationsDropdown;
