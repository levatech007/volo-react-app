import React, { Component } from 'react';

class LocationsDropdown extends Component {


  render() {
    return (
          <select className="form-control form-control-lg">
            { this.props.locations.map((location, idx) => {
              return(
                <option value={location.name} key={idx}>{location.name} @ {location.airport}</option>
                )
              })
            }
          </select>
    )
  }
}

export default LocationsDropdown;
