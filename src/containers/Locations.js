import React, { Component } from "react";
import LocationsDropdown from "../components/LocationsDropdown.js"


class Locations extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
    }
  }

  componentDidMount() {

    fetch('http://localhost:8000/locations')
        .then((res) => {
          return res.json();
        }).then((locations) => {
          console.log(locations)
          this.setState({ locations: locations })
    });
  }



  render() {
    return (
      <div className="container">
        <div className="row background">
          <div className="col-12">
            <LocationsDropdown locations={ this.state.locations }/>
            <div className="row">
              <div className="col-6">
                <div className="row justify-content-center">
                  <button className="btn btn-light button-margin">About Location</button>
                </div>
              </div>
              <div className="col-6">
                <div className="row justify-content-center">
                  <button className="btn btn-light button-margin">Select entry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Locations;
