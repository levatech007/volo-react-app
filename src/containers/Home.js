import React, { Component } from 'react';
import Header from '../components/Header.js';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <h1>Hello world!</h1>
      </div>
    );
  }
}

export default Home;
