import React, { Component } from "react";

class AircraftInfo extends Component {

  render() {
    return(
      <div className="row aircraft-info">
        <div className="col-6">
            <ul>
              <li><p>Airplane introduction will be written here</p></li>
              <li><p>Some stats here</p></li>
              <li><p>... and here</p></li>
            </ul>
          </div>
          <div className="col-6">
            <img className="img-fluid" src={ require(`../images/aircraft-images/${ this.props.imageName }.jpg`) } alt={ this.props.imageName }/>
          </div>
        </div>
      )
  }
}

export default AircraftInfo
