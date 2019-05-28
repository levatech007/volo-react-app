import React, { Component } from "react";

class AirportInfo extends Component {

  render() {
    console.log(this.props.airportInfo)
    return(
      <div className="row justify-content-center aircraft-info">
        <div className="row aircraft-title"><h1>{ this.props.airportInfo.airportName }</h1></div>
        <div className="row">
          <div className="col-12">
            <p>Location: { this.props.airportInfo.location }</p>
          </div>
            <div className="col-12">
              <p>{ this.props.airportInfo.description }</p>
            </div>
          </div>
        </div>
      )
  }
}

export default AirportInfo
