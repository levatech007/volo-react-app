import React, { Component } from 'react';
import ReactStars from 'react-stars'

class OneReview extends Component {

  render() {
    return(
      <div>
        <div className="card-header" id={"heading" + (this.props.number)}>
          <div className="row justify-content-between" data-toggle="collapse" data-target={"#collapse" + (this.props.number)} aria-expanded="true" aria-controls="collapseOne">
              <div className="col-6">
                <h4>{this.props.oneReview.author}</h4>
              </div>
              <div className="col-3">
                <ReactStars count={5} value={ this.props.oneReview.rating } edit={ false } size={24} color2={'#ffd700'} />
              </div>
            </div>
        </div>
        <div id={"collapse" + (this.props.number)} className="collapse" aria-labelledby={"heading" + (this.props.number)} data-parent="#accordion">
          <div className="card-body">
            { this.props.oneReview.content }
          </div>
        </div>
      </div>
    )
  }
}

export default OneReview;
