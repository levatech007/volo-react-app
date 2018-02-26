import React, { Component } from "react";
import Auth from "j-toker";
import $ from "jquery";
import LocationInfo from "../components/Location.js";
import ReviewsAccordion from "../components/ReviewsAccordion.js";
import CreateReviewForm from "../components/CreateReviewForm.js";

class Locations extends Component {
  constructor() {
    super();
    this.state = {
      location: {},
      reviews: [],
      reviewCount: "",
      showForm: false,
      latitude: 0,
      longitude: 0,
      errors: "",
    }
    this.showReviewForm = this.showReviewForm.bind(this);
    this.onSubmitReviewForm = this.onSubmitReviewForm.bind(this);
  }

  componentWillMount() {
    let locationId = this.props.match.params.id;
    fetch(`http://localhost:8000/locations/${locationId}.json`)
    .then((res) => {
      return res.json();
    }).then((location) => {
      this.setState({
        location: location,
        reviewCount: location.reviews.length,
        reviews: location.reviews,
        latitude: location.latitude,
        longitude: location.longitude,
      })
    });
  }

  showReviewForm(e) {
    e.preventDefault();
    this.setState({ showForm: true})
  }

  onSubmitReviewForm(review) {

    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
      });
    $.post({
      url: "http://localhost:8000/reviews",
      data: {
        author: review.author,
        content: review.content,
        rating: review.rating,
        location_id: this.state.location.id,
      },
      success: function(data) {
        console.log(data);
        // this.setState({ reviews: [data].concat(this.state.reviews) })
      },
      error: function(data) {
        console.log(data);
      }
    });

    this.setState({ showForm: false})
  }

  render() {
    let showReviewForm = this.state.showForm
    return(
      <div className="container">
        <div className="row background">
          <div className="col-md-12">
            <LocationInfo location={ this.state.location } reviewCount={ this.state.reviewCount} latitude={ this.state.latitude } longitude={ this.state.longitude }/>
            {/* { this.state.errors? <div className="alert alert-danger" role="alert">{this.state.errors}</div> : null } */}
            { showReviewForm ?
              <CreateReviewForm onSubmitReviewForm={ this.onSubmitReviewForm } locationId={ this.state.location.id } />
              :
              (<div>
                <ReviewsAccordion allReviews={ this.state.reviews }/>
                <div className="row justify-content-center">
                  <button onClick={ this.showReviewForm } className="btn btn-light button-margin">Add review</button>
              </div>
              </div>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Locations;
