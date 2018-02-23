import React, { Component } from 'react';

class UserOneCalendarEntry extends Component {
  render() {
    return(
      <div>
        <div className="card-header" id={"heading" + (this.props.number)}>
          <div className="row justify-content-between" data-toggle="collapse" data-target={"#collapse" + (this.props.number)} aria-expanded="true" aria-controls="collapseOne">
            <div className="col-6">
            </div>
            <div className="col-1">
              <img src={this.props.oneEntry.icon_url} />
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

export default UserOneCalendarEntry;
