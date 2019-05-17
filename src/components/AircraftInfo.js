import React, { Component } from "react";

class AircraftInfo extends Component {

  render() {
    return(
      <div className="row justify-content-center aircraft-info">
        <div className="row aircraft-title"><h1>{ this.props.aircraftInfo.fullName }</h1></div>
        <div className="row">
          <div className="col-12 col-md-6">
              <img className="img-fluid" src={ require(`../images/aircraft-images/${ this.props.aircraftInfo.name }.jpg`) } alt={ this.props.aircraftInfo.name }/>
            </div>
            <div className="col-12 col-md-6">
              <p>{ this.props.aircraftInfo.description }</p>
            </div>
          </div>
        </div>
      )
  }
}

export default AircraftInfo
