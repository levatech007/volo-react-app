import React, { Component } from 'react';
import UserProfile from "../components/UserProfile.js"
import UserCalendar from "../components/UserCalendar.js"

class Profile extends Component {
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
