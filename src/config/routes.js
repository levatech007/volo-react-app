import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from '../App.js'
import Home from '../containers/Home.js'

export default (
  <Switch>
      <Route exact path='/' component={ Home }/>
      {/* change from app to home page! */}
    </Switch>
)
