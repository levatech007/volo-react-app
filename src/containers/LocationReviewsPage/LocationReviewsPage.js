import React, { Component } from "react";
import Auth                 from "j-toker";
import $                    from "jquery";
import LocationInfo         from "../../components/Location.js";
import ReviewBanner         from "../../components/Banners/ReviewBanner.js";
import LocationReviewForm   from "../../components/Forms/LocationReviewForm.js";
import LocationInfoBox      from "../../components/LocationInfoBox/LocationInfoBox.js";
import ReactStars           from "react-stars";
import "./reviews-page.css"

class ReviewsPage extends Component {
  constructor() {
    super();
    this.state = {
                    userId:               0,
                    location:             {latitude: null, longitude: null},
                    reviews:              [],
                    reviewCount:          0,
                    showForm:             false,
                    latitude:             0,
                    longitude:            0,
                    errors:               "",
                  }
    this.showReviewForm         = this.showReviewForm.bind(this);
    this.onSubmitReviewForm     = this.onSubmitReviewForm.bind(this);
    this.renderLocationReviews  = this.renderLocationReviews.bind(this);
  }

  componentWillMount() {
    Auth.validateToken()
    .then((user) => {
      this.setState({ userId: user.id })
    })
    let locationId = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}.json`)
    .then((res) => {
      return res.json();
    })
    .then((location) => {
      this.setState({
                      location:     location,
                      reviewCount:  location.reviews.length,
                      reviews:      location.reviews.reverse(),
                      latitude:     location.latitude,
                      longitude:    location.longitude,
                    })
    });

  }

  showReviewForm(e) {
    e.preventDefault();
    this.setState({ showForm: true })
  }

  onSubmitReviewForm(review) {
    let currentReviews = this.state.reviews
    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.post({
      url: `${process.env.REACT_APP_BACKEND_URL}/reviews`,
      data: {
              author:       review.author,
              title:        review.title,
              content:      review.content,
              rating:       review.rating,
              location_id:  this.state.location.id,
            },
      success: (data) => {
        let newReview = [data.review]
        this.setState({
                        reviews:      newReview.concat(currentReviews),
                        showForm:     false,
                        reviewCount:  this.state.reviewCount + 1
                      })
      },
    });
    this.setState({ showForm: false})
  }

  renderLocationReviews() {
    console.log("Reviews runing")
      this.state.reviews.map((oneReview, idx) => {
        console.log(oneReview)
        return(
          <ReviewBanner
            key={ idx }
            review={ oneReview }
          />
        )
      })
  }

  render() {
    console.log(this.state.reviews)
    let showReviewForm = this.state.showForm
    return(
      <div className="container">
        <div className="row background">
          <div className="col-md-12">
            { this.state.location.latitude && <LocationInfoBox location={ this.state.location } reviewCount={ this.state.reviewCount}/> }
            { showReviewForm &&
              <LocationReviewForm
                onSubmitReviewForm={ this.onSubmitReviewForm }
                locationId={ this.state.location.id }
              />
            }
            { this.state.userId && !this.state.showForm ?
              <div className="row add-review">
                <div className="add-review-btn">
                  <button
                    className="box-shadow"
                    onClick={ this.showReviewForm }><i class="fas fa-plus"></i></button>
                </div>
                <div className="review-btn-label">
                  <p>Add a review</p>
                </div>
              </div>
              :
              null
            }
            {
              this.state.reviews.map((oneReview, idx) => {
                return(
                  <ReviewBanner
                    key={ idx }
                    review={ oneReview }
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewsPage
