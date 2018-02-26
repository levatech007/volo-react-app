import React, { Component } from 'react';

class OneCalendarOption extends Component {
  constructor() {
    super();
    this.onSubmitEntry = this.onSubmitEntry.bind(this);
  }

  onSubmitEntry() {
    this.props.createCalendarEntry(this.props.oneDay, this.refs.notes.value, this.props.oneDay)
    this.refs.notes.value = ""
  }

  render() {
    return(
      <div>
        <div className="card-header" id={"heading" + (this.props.number)}>
          <div className="row justify-content-between" data-toggle="collapse" data-target={"#collapse" + (this.props.number)} aria-expanded="true" aria-controls="collapseOne">
            <div className="col-6">
              <h4>{this.props.oneDay.date.weekday}, {this.props.oneDay.date.day} {this.props.oneDay.date.monthname}</h4>
            </div>
            <div className="col-1">
              <img src={this.props.oneDay.icon_url} />
            </div>
          </div>
        </div>
        <div id={"collapse" + (this.props.number)} className="collapse" aria-labelledby={"heading" + (this.props.number)} data-parent="#accordion">
          <div className="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life sustainable VHS.
            <input type="textarea" ref="notes"/>
          </div>
          <button onClick={ this.onSubmitEntry } className="btn btn-primary"> + </button>
        </div>
      </div>
    )
  }
}

export default OneCalendarOption;
