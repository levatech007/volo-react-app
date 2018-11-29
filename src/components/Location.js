import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import GoogleMaps from "./GoogleMapsAPI.js"

class Location extends Component {

  render() {
    return(
      <div className="row">
        <div className="col-6">
            <ul>
              <li><h4>{ this.props.location.name }</h4></li>
              <li><p>{ this.props.location.airport_name } ({ this.props.location.airport })</p></li>
              <li><p>{ this.props.location.description }</p></li>
              <li><ReactStars count={ 5 } value={ parseFloat(this.props.location.rating) } edit={ false } size={ 24 } color2={ '#ffd700' } /></li>
              <Link to={`/locations/${this.props.location.id}`}><li><p>REVIEWS ({ this.props.reviewCount })</p></li></Link>
            </ul>
          </div>
        <div className="col-6">
          <GoogleMaps lat={ this.props.location.latitude } long={this.props.location.longitude } />
        </div>
      </div>
    )
  }
}

export default Location;
