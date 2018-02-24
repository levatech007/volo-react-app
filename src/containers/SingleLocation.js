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
    }
    this.showReviewForm = this.showReviewForm.bind(this);
    this.onSubmitReviewForm = this.onSubmitReviewForm.bind(this);
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

  showReviewForm(e) {
    e.preventDefault();
    this.setState({ showForm: true})
  }

  onSubmitReviewForm(review) {
    $.post({
      url: "http://localhost:8000/reviews",
      data: {
        author: review.author,
        content: review.content,
        rating: review.rating,
        location_id: review.location,
      },
      beforeSend(xhr, settings) {
        $.auth.appendAuthHeaders(xhr, settings);
      },
      success: function(data) {
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
            <LocationInfo location={ this.state.location } reviewCount={ this.state.reviewCount}/>
            { showReviewForm ?
              <CreateReviewForm onSubmitReviewForm={ this.onSubmitReviewForm } />
              :
              (<div><ReviewsAccordion allReviews={ this.state.reviews }/><button onClick={ this.showReviewForm } className="btn btn-primary">Add review</button></div>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Locations;
