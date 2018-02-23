import React, { Component } from "react";
import LocationInfo from "../components/Location.js"
import ReviewsAccordion from "../components/ReviewsAccordion.js"

class Locations extends Component {
  constructor() {
    super();
    this.state = {
      location: {},
      reviews: [],
      reviewCount: ''
    }
  }

  componentWillMount() {
    let locationId = this.props.match.params.id;
    console.log(locationId)
    fetch(`http://localhost:8000/locations/${locationId}.json`)
        .then((res) => {
          return res.json();
        }).then((location) => {
          this.setState({
            location: location,
            reviewCount: location.reviews.length,
            reviews: location.reviews
          })
    });
  }

  render() {
    return(
      <div className="container">
        <div className="row background">
          <LocationInfo location={ this.state.location } reviewCount={ this.state.reviewCount}/>
          <ReviewsAccordion allReviews={ this.state.reviews } />
        </div>
      </div>
    )
  }
}

export default Locations;
