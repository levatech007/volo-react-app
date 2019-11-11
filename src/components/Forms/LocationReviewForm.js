import React, { Component } from 'react';
import ReactStars from "react-stars";
import "./form.css";

class LocationReviewForm extends Component {
  constructor(){
    super();
    this.state = {
                    author:     "",
                    title:      "",
                    content:    "",
                    rating:     0,
                    locationId: 0,
                  }
    // this.renderLocationReviewForm   = this.renderLocationReviewForm.bind(this);
    this.handleInputChange          = this.handleInputChange.bind(this);
    this.handleRatingInputChange    = this.handleRatingInputChange.bind(this);
    this.handleReviewFormSubmission = this.handleReviewFormSubmission.bind(this);
  }

  componentDidMount() {
    this.setState({ locationId: this.props.locationId })
  }

  handleInputChange(e) {
    e.preventDefault()
    const name  = e.target.name
    const value = e.target.value

    this.setState({
      [name]: value,
      rating: this.state.rating
     })
  }

  handleRatingInputChange(e) {
    this.setState({ rating: e })
  }

  handleReviewFormSubmission(e) {
    e.preventDefault()
    let review = {
                    author:     this.state.author,
                    title:      this.state.title,
                    content:    this.state.content,
                    rating:     this.state.rating,
                    locationId: this.state.locationId
                  }
    this.props.onSubmitReviewForm(review)
    this.setState({
                    author:     "",
                    title:      "",
                    content:    "",
                    rating:     0,
                    locationId: 0,
                  })
  }

  render() {
    return(
        <div className="col-12">
          <form onSubmit={ this.handleReviewFormSubmission } className="forms review">
            <div className="row">
              <div className="col-sm-3">
                <label>Name</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="author"
                  placeholder="Enter your name"
                  onChange={this.handleInputChange}
                  value={ this.state.author }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <label>Title</label>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter a title for your review"
                  onChange={this.handleInputChange}
                  value={ this.state.title }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <label>Review</label>
              </div>
              <div className="col-sm-9">
                <textarea
                  type="textarea"
                  rows="4"
                  name="content"
                  placeholder="Your review..."
                  onChange={this.handleInputChange}
                  value={ this.state.content }
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <ReactStars
                count={ 5 }
                size={ 36 }
                color2={ '#ffd700' }
                value={ this.state.rating }
                onChange={ this.handleRatingInputChange }
              />
            </div>
            <div className="row justify-content-md-center">
              <button type="submit" className="footer-btn submit">Post review</button>
            </div>
          </form>
        </div>
      )
  }
}

export default LocationReviewForm;
