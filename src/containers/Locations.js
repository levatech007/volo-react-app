import React, { Component } from 'react';
import LocationsDropdown from "../components/LocationsDropdown.js"

class Locations extends Component {
  constructor() {
    super();
    this.state = {
      locations: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/locations')
        .then((res) => {
          return res.json(); // res cannot be read, need to convert to json
        }).then((locations) => {
          // console.log(locations)
          this.setState({ locations: locations })

    });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center background">
          <div className="col-12">
            {/* add image */}
            <h1>Select location</h1>
            <LocationsDropdown locations = { this.state.locations }/>
        </div>
        </div>
      </div>
    );
  }
}

export default Locations;
