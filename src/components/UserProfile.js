import React, { Component } from 'react';
import Auth from "j-toker";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
      name: ""
    }
  }

  render() {
    return(
      <div><h2>Hello { Auth.user.name } </h2></div>
    )
  }
}

export default UserProfile;
