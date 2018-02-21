import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../containers/Home.js'
import Login from '../containers/Login.js'
import Locations from '../containers/Locations.js'

export default (
  <Switch>
      <Route exact path='/' component={ Home }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/locations' component={ Locations }/>
    </Switch>
)
