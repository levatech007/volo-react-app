import React, { Component } from "react";
import ReactStars           from "react-stars";
import Auth                 from "j-toker";
import Modal                from "../../components/Modal/Modal.js"
import "./banner.css";
import "./review-banner.css";

class ReviewBanner extends Component {
  constructor() {
      super();
      this.state = {
        weatherStyles: {},
        showExtendedContent: false,
        reviewsBannerClass: "banner",
        extendedContentClass: "extended-banner",
        confirmDeleteReview: false,
        deleteReviewModal: {
          title: "Delete Review",
          content: "Are you sure you want to delete this review?",
          buttonText: "Delete review"
        }
      }
      this.renderExtendedContent   = this.renderExtendedContent.bind(this)
      this.toggleExtendedContent   = this.toggleExtendedContent.bind(this)
      this.onEditReview            = this.onEditReview.bind(this)
      this.toggleDeleteReviewModal = this.toggleDeleteReviewModal.bind(this)
      this.onDeleteReview          = this.onDeleteReview.bind(this)
  }

  onEditReview() {

  }

  toggleDeleteReviewModal() {
    this.setState({ confirmDeleteReview: !this.state.confirmDeleteReview })
  }

  onDeleteReview() {
    console.log("Delete review")

  }

  renderExtendedContent() {
    return(
      <div className={ this.state.extendedContentClass }>
        <div className="extended-full-width">
          <p>{ this.props.review.content }</p>
          {
            Auth.user.id === this.props.review.user_id &&
            <div className="edit-icons">
              <i className="fas fa-pen"></i>
              <i
                className="fas fa-trash"
                onClick={ this.toggleDeleteReviewModal }
              ></i>
            </div>
          }
        </div>
      </div>
    )
  }

  toggleExtendedContent() {
    this.setState({
      showExtendedContent: !this.state.showExtendedContent,
     })
    if(this.state.showExtendedContent) {
      this.setState({
        reviewsBannerClass: "banner slide-up",
        extendedContentClass: "extended-banner fade-out",
       })
    } else {
      this.setState({
        reviewsBannerClass: "banner slide-down",
        extendedContentClass: "extended-banner fade-in",
       })
    }
  }

  render() {
    return(
      <div className={ `${ this.state.reviewsBannerClass } review-banner` }>
        {
          this.state.confirmDeleteReview &&
            <Modal
              content={ this.state.deleteReviewModal.content }
              title={ this.state.deleteReviewModal.title }
              buttonText={ this.state.deleteReviewModal.buttonText }
              close={ this.toggleDeleteReviewModal }
              submit={ this.onDeleteReview }
            />
        }
        <div className="top-content">
          <div className="review-title">
            <h3>{ this.props.review.title }</h3>
            <p>by { this.props.review.author }</p>
          </div>
          <div className="review-rating">
            <ReactStars
              count={ 5 }
              value={ parseFloat(this.props.review.rating) }
              edit={ false }
              size={ 18 }
              color2={ "#ffd700" }
            />
          </div>
        </div>
        <div className="expand-button">
          <button onClick={ this.toggleExtendedContent } className="plain-button expand-btn">
            { this.state.showExtendedContent ? "-" : "+" }
          </button>
        </div>
        { this.state.showExtendedContent && this.renderExtendedContent() }
      </div>
    )
  }
}

export default ReviewBanner
