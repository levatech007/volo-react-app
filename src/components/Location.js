import React, { Component } from 'react';

class Location extends Component {

  render() {
    return(
      <div className="row">
        <div className="col-6">
          <div className="row">
            <ul>
              <li><h3>{ this.props.location.name }</h3></li>
              <li><h4>{ this.props.location.airport }</h4></li>
              <li><h4>{ this.props.location.rating }</h4></li>
              <li><h4>REVIEWS ({ this.props.reviewCount})</h4></li>
            </ul>
          </div>
        </div>
        <div className="col-6">MAP/IMG</div>
      </div>
    )
  }
}

export default Location;
