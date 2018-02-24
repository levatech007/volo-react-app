import React, { Component } from 'react';
import ReactStars from "react-stars";

class CreateReviewForm extends Component {
  constructor(){
    super();
    this.state = {
      review: {
        author: "",
        content: "",
        rating: "",
        locationId: 0,
      }
    }
    this.onAuthorInputChange = this.onAuthorInputChange.bind(this);
    this.onContentInputChange = this.onContentInputChange.bind(this);
    this.onRatingInputChange = this.onRatingInputChange.bind(this);
    this.onFormSubmit= this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ location_id: this.props.locationId });
  }

  onAuthorInputChange(e) {
    this.setState({
      review: {
        author: e.target.value,
        content: this.state.review.content,
        rating: this.state.review.rating,
        locationId: this.state.review.locationId,
      }
    })
  }

  onContentInputChange(e) {
    this.setState({
      review: {
        author:this.state.review.author,
        content: e.target.value,
        rating: this.state.review.rating,
        location: this.state.review.locationId,
      }
    })
  }

  onRatingInputChange(e) {
    this.setState({
      review: {
        author:this.state.review.author,
        content: this.state.review.content,
        rating:  e,
        location: this.state.review.locationId,
      }
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    // get location id from params
    let review = this.state.review
    console.log(review)
    this.props.onSubmitReviewForm(review);
    this.setState({
      review: {
        author: "",
        content: "",
        rating: 0,
        locationId: 0,
      }
    })
  }

  render() {
    return(
        <div className="col-6">
        <form onSubmit={ this.onFormSubmit } className="forms review">
          <div className="form-group">
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Enter your name"
              onChange={this.onAuthorInputChange}
            />
          </div>
          <div className="form-group">
            <textarea
              type="textarea"
              rows="4"
              name="content"
              className="form-control"
              placeholder="Your review..."
              onChange={this.onContentInputChange}
            />
          </div>
          <ReactStars
            count={ 5 }
            size={ 36 }
            color2={ '#ffd700' }
            onChange={ this.onRatingInputChange }
          />
          <div className="row justify-content-md-center">
            <input
              type="submit"
              className="btn btn-light"
              value="Post Review"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateReviewForm;
