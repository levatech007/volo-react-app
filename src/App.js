import React, { Component } from 'react';
import './App.css';
import MyRoutes from './config/routes'
import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <div className="gradient">
        <Header />
        { MyRoutes }
      </div>
    );
  }
}

export default App;
