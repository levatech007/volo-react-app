import React, { Component } from "react";
import $ from "jquery";
import UserProfile from "../components/UserProfile.js";
import UserCalendar from "../components/UserCalendar.js";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
    }
  }

  render(){
    return(
      <div>
        <UserProfile />
        <UserCalendar />
      </div>
    )
  }
}

export default Profile;
