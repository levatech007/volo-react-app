import React, { Component } from "react";

class About extends Component {
  render() {
    return(
      <div className="container">
        <div className="row justify-content-center background">
          <h1>About</h1>
          <p>Volo (Italian for flight) is an app for plane spotters. You can find information about plane spotting
            locations around the world with user reviews of each location. The app also lets you create an account,
            check weather forecast for chosen location as well as add a select day to your calendar.</p>
            <p>This app is built with React on the front end and Rails API + PostgreSQL on the back end.</p>
            <p>Please note, the app uses the free version of Heroku and it may yake a few minutes for the app or its content to load.</p>
        </div>
      </div>
    )
  }


}

export default About;
