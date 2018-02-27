import React, { Component } from "react";
import ReactStars from "react-stars";
import LocationMap from "../components/LocationMap.js";

class Location extends Component {

  render() {
    console.log(this.props)
    return(
      <div className="row">
        <div className="col-6">
          <div className="row">
            <ul>
              <li><h4>{ this.props.location.name }</h4></li>
              <li><p>{ this.props.location.airport_name } ({ this.props.location.airport })</p></li>
              <li><p>{ this.props.location.description }</p></li>
              <li><ReactStars count={ 5 } value={ this.props.location.rating } edit={ false } size={ 24 } color2={ '#ffd700' } /></li>
              <li><p>REVIEWS ({ this.props.reviewCount })</p></li>
            </ul>
          </div>
        </div>
        <div className="col-6">
          <LocationMap lat={ this.props.location.latitude } long={this.props.location.longitude }/>
        </div>
      </div>
    )
  }
}

export default Location;
