import React, { Component } from 'react';
import UserOneCalendarEntry from "../components/UserOneCalendarEntry.js"

class UserCalendar extends Component {
  render() {
    return(
      <div id="accordion">
        {
          this.props.userCalendar.map((oneEntry, idx) => {
            return(
              <div className="card" key={idx}>
                <UserOneCalendarEntry oneEntry={ oneEntry } />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserCalendar;
