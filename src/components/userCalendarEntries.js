import React, { Component } from "react";
import SingleUserCalendarEntry from "../components/SingleUserCalendarEntry.js";

class UserCalendarEntries extends Component {


  render() {
    return (
      <div className="col-md-12">
        <div id="accordion">
          {
            this.props.userCalendar.map((oneEntry, idx) => {
              return(
                <div className="card" key={idx}>
                  <SingleUserCalendarEntry oneEntry={ oneEntry } number={(idx+1)}/>
                </div>
               )
            })
          }
        </div>
      </div>
    )
  }
}

export default UserCalendarEntries;
