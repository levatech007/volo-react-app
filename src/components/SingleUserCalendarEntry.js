import React, { Component } from "react";

class SingleUserCalendarEntry extends Component {
  render() {
    return(
      <div>
        <div className="card-header" id={"heading" + (this.props.number)}>
          <div className="row justify-content-between" data-toggle="collapse" data-target={"#collapse" + (this.props.number)} aria-expanded="true" aria-controls="collapseOne">
            <div className="col-6">
              <h4>{this.props.oneEntry.weekday}, {this.props.oneEntry.month} {this.props.oneEntry.day}</h4>
            </div>
            <div className="col-1">
              <img src={this.props.oneEntry.icon_url} />
            </div>
          </div>
        </div>
        <div id={"collapse" + (this.props.number)} className="collapse" aria-labelledby={"heading" + (this.props.number)} data-parent="#accordion">
          <div className="card-body">
            <p>{ this.props.oneEntry.notes }</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleUserCalendarEntry;
