import React, { Component } from 'react';
import OneReview from "../components/OneReview.js"

class ReviewsAccordion extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div id="accordion">
            {
              this.props.allReviews.map((oneReview, idx) => {
                return(
                  <div className="card" key={idx}>
                    <OneReview oneReview={ oneReview } number={(idx+1)}/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewsAccordion;
