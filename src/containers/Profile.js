import React, { Component } from "react";
import $ from "jquery";
import Auth from "j-toker"
import UserCalendarEntries from "../components/userCalendarEntries.js";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
    }
  }

  componentDidMount() {
    let userId = this.props.match.params.id
    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.get({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
      success: (data) => {
        console.log(data);
        this.setState({ calendar: data.calendars })
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  render(){
    return(
      <div className="container">
        <div className="row background">
          <h2>Welcome { Auth.user.name }</h2>
          <div className="col-12">
          <UserCalendarEntries userCalendar={ this.state.calendar }/>
        </div>
        </div>
      </div>
    )
  }
}

export default Profile;
