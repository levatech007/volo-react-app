import React, { Component } from 'react';

class LocationsDropdown extends Component {


  render() {
    return (
        <div className="btn-group">
          <button className="btn btn-light btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select location
          </button>
          <div className="dropdown-menu">
            { this.props.locations.map(location => {
              return(
                <a key={location._id} className="dropdown-item" href="...">{location.name} @ {location.airport}</a>
                )
              })
            }
          </div>
        </div>
    )
  }
}

export default LocationsDropdown;
