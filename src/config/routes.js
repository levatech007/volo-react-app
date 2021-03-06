import React               from "react";
import { Switch, Route }   from "react-router-dom";
import HomePage            from "../containers/HomePage/HomePage.js";
import About               from "../containers/About.js";
import LoginSignupPage     from "../containers/LoginSignupPage.js";
import Locations           from "../containers/Locations.js";
import ChangePassword      from "../containers/ChangePassword.js";
import Api                 from "../containers/Api.js";
import PageNotFound        from "../containers/PageNotFound.js";
import FlightsByAircraft   from "../containers/FlightsByAircraftPage.js";
import ProfilePage         from "../containers/ProfilePage/ProfilePage.js";
import LocationReviewsPage from "../containers/LocationReviewsPage/LocationReviewsPage.js";
import LocationWeatherPage from "../containers/LocationWeatherPage/LocationWeatherPage.js";

export default (
  <Switch>
      <Route exact path="/" component={ HomePage }/>
      <Route exact path="/about" component={ About }/>
      <Route exact path="/login" component={ LoginSignupPage }/>
      <Route exact path="/users/:id" component={ ProfilePage }/>
      <Route exact path="/locations" component={ Locations }/>
      <Route exact path="/locations/:id" component={ LocationReviewsPage }/>
      <Route exact path="/locations/:id/aircrafts" component={ FlightsByAircraft }/>
      <Route exact path="/weather/:id" component={ LocationWeatherPage }/>
      <Route exact path="/password" component={ ChangePassword } />
      <Route exact path="/api" component={ Api } />
      <Route path="*" component={ PageNotFound } />
    </Switch>
)
