import React, { Component } from 'react';
import ReactStars from 'react-stars'
import LocationMap from "../components/LocationMap.js"

class Location extends Component {

  render() {
    return(
      <div className="row">
        <div className="col-6">
          <div className="row">
            <ul>
              <li><h3>{ this.props.location.name }</h3></li>
              <li><h4>{ this.props.location.airport }</h4></li>
              <li><h4><ReactStars count={5} value={ this.props.location.rating } edit={ false } size={24} color2={'#ffd700'} /></h4></li>
              <li><p>REVIEWS ({ this.props.reviewCount})</p></li>
            </ul>
          </div>
        </div>
        <div className="col-6">
          <LocationMap/>
        </div>
      </div>
    )
  }
}

export default Location;
