import React, { Component } from 'react';

class OneReview extends Component {

  render() {
    return(
      <div>
        <div className="card-header" id={"heading" + (this.props.number)}>
          <div className="row justify-content-between" data-toggle="collapse" data-target={"#collapse" + (this.props.number)} aria-expanded="true" aria-controls="collapseOne">
              <div className="col-6">
                <h4>{this.props.oneReview.author}</h4>
              </div>
              <div className="col-1">
                { this.props.oneReview.rating}
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
