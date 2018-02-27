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
      location: {latitude: null, longitude: null},
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${locationId}.json`)
    .then((res) => {
      return res.json();
    }).then((location) => {
      console.log(location)
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
    let currentReviews = this.state.reviews
    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.post({
      url: `${process.env.REACT_APP_BACKEND_URL}/reviews.json`,
      data: {
        author: review.author,
        title: review.title,
        content: review.content,
        rating: review.rating,
        location_id: this.state.location.id,
      },
      success: (data) => {
        this.setState({
          reviews: currentReviews.concat([data.review]),
          showForm: false,
        })
      },
    });
    this.setState({ showForm: false})
  }

  render() {
    let showReviewForm = this.state.showForm
    return(
      <div className="container">
        <div className="row background">
          <div className="col-md-12">
            { this.state.location.latitude && <LocationInfo location={ this.state.location } reviewCount={ this.state.reviewCount}/> }
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
