import React, { Component } from "react";

class AircraftInfo extends Component {

  render() {
    console.log(this.props.aircraftInfo)
    return(
      <div className="row aircraft-info">
        <div className="col-6">
            <h1>{ this.props.aircraftInfo.fullName }</h1>
            <p>{ this.props.aircraftInfo.description }</p>
          </div>
          <div className="col-6">
            <img className="img-fluid" src={ require(`../images/aircraft-images/${ this.props.aircraftInfo.name }.jpg`) } alt={ this.props.aircraftInfo.name }/>
          </div>
        </div>
      )
  }
}

export default AircraftInfo
