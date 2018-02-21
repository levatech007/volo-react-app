import React, { Component } from 'react';
import './App.css';
import MyRoutes from './config/routes'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        { MyRoutes }
      </div>
    );
  }
}

export default App;
