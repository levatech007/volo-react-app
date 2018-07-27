import React, { Component } from "react";

class About extends Component {
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="container">
        <div className="row justify-content-center background">
          <h1>About</h1>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <p>Volo (Italian for flight) is an app for plane spotters. You can find information about plane spotting
                locations (SFO, LAX and SXM) with user reviews of each location. The app also lets you create an account,
                check weather forecast for chosen location as well as add a select day to your calendar.
              </p>
              <p>This app is built with React and Rails.</p>
              <p>For more information and source code, please see Volo on Github:</p>
              <ul>
                <li><a href="https://github.com/levatech007/volo-react-app" target="_blank" rel="noopener noreferrer">React front-end app</a></li>
                <li><a href="https://github.com/levatech007/volo_rails_api" target="_blank" rel="noopener noreferrer">Rails back-end app</a></li>
              </ul>
              <p>This app is under constant improvement. In the future, users will be able to see more detailed information regarding spotting location (parking, ameneties, etc.),
              select what type of plane they are interested in seeing as well as see calendars for airshows.</p>
              <p>*Please note that this app uses the free version of Heroku. It may take a few minutes for the app and its content to load.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About;
