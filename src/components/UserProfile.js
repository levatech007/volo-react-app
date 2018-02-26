import React, { Component } from 'react';

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
      <div><h2>Hello User </h2></div>
    )
  }
}

export default UserProfile;
