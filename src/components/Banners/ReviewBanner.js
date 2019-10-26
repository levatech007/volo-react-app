import React, { Component } from "react";
import ReactStars           from "react-stars";
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
      }
      this.renderExtendedContent = this.renderExtendedContent.bind(this)
      this.toggleExtendedContent = this.toggleExtendedContent.bind(this)
  }

  componentDidMount() {
    // get reviews this.setState({  })
  }

  renderExtendedContent() {
    return(
      <div className={ this.state.extendedContentClass }>
        <div className="extended-full-width">
          <p>Lorem ipsum review here</p>
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
        <div className="top-content">
          <div className="review-title">
            <h3>REVIEW TITLE</h3>
            <p>by USER</p>
          </div>
          <div className="review-rating">
            <ReactStars
              count={5}
              value={ parseFloat(this.props.review.rating) }
              edit={ false }
              size={24}
              color2={"#ffd700"}
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
