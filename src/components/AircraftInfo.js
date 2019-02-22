import React, { Component } from "react";

class AircraftInfo extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="row">
        <div className="col-6">
            <ul>
              <li><p>Airplane introduction will be written here</p></li>
              <li><p>Some stats here</p></li>
              <li><p>... and here</p></li>
            </ul>
          </div>
        <div className="col-6">
          <img className="img-fluid" src={ require(`../images/aircraft-images/${ this.props.imageName }.jpg`) }/>
        </div>
      </div>
    )
  }
}

export default AircraftInfo
