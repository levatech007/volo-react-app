import React, { Component } from 'react';


class CreateReviewForm extends Component {
  constructor(){
    super();
    this.state = {
      review: {
        author: "",
        content: "",
        rating: "",
        location_id: 7
      }
    }
    this.onAuthorInputChange = this.onAuthorInputChange.bind(this);
    this.onContentInputChange = this.onContentInputChange.bind(this);
    this.onRatingInputChange = this.onRatingInputChange.bind(this);
    this.onFormSubmit= this.onFormSubmit.bind(this);
  }

  onAuthorInputChange(e) {
    this.setState({
      review: {
        author: e.target.value,
        content: this.state.review.content,
        rating: this.state.review.rating,
        location: 7,
      }
    })
  }

  onContentInputChange(e) {
    this.setState({
      review: {
        author:this.state.review.author,
        content: e.target.value,
        rating: this.state.review.rating,
        location: 7
      }
    })
  }

  onRatingInputChange(e) {
    this.setState({
      review: {
        author:this.state.review.author,
        content: this.state.review.content,
        rating:  e.target.value,
        location: 7
      }
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    // get location id from params
    let review = this.state.review
    this.props.onSubmitReviewForm(review);
    this.setState({
      review: {
        author: "",
        content: "",
        rating: 0,
        location: 7
      }
    })
  }

  render() {
    return(
      <form onSubmit={ this.onFormSubmit } className="forms">
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
          <input
            type="textarea"
            name="content"
            className="form-control"
            placeholder="Your review..."
            onChange={this.onContentInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="rating"
            className="form-control"
            placeholder="Your rating (0-5)"
            onChange={this.onRatingInputChange}
          />
        </div>
        <div className="row justify-content-md-center">
          <input
            type="submit"
            className="btn btn-light"
            value="Post Review"
          />
        </div>
      </form>
    )
  }
}

export default CreateReviewForm;
