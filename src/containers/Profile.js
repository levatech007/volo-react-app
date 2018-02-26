import React, { Component } from "react";
import $ from "jquery";
import Auth from "j-toker"
// import UserProfile from "../components/UserProfile.js";
// import UserCalendar from "../components/UserCalendar.js";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
    }
  }

  componentDidMount() {
    let userId = this.props.match.params.id
    console.log(userId)
    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.get({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
      success: (data) => {
        console.log(data);
        // this.setState({ calendar: ___ })
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  render(){
    return(
      <div>
        <h2>Welcome { Auth.user.name }</h2>
        {/* <UserProfile /> */}
        {/* <UserCalendar /> */}
      </div>
    )
  }
}

export default Profile;
