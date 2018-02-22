import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "../containers/Home.js"
import Login from "../containers/Login.js"
import Profile from "../containers/Profile.js"
import Locations from "../containers/Locations.js"
import Calendars from "../containers/Calendars.js"
import SingleLocation from "../containers/SingleLocation.js"



export default (
  <Switch>
      <Route exact path="/" component={ Home }/>
      <Route exact path="/login" component={ Login }/>
      <Route exact path="/user/:id" component={Profile}/>
      <Route exact path="/locations" component={ Locations }/>
      <Route exact path="/locations/:id" component={ SingleLocation }/>
      <Route exact path="/calendars" component={ Calendars }/>
    </Switch>
)
