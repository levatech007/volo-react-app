import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class PageNotFound extends Component {
  render() {
    return(
      <div className="container">
        <div className="row justify-content-center background">
          <div className="col-md-6">
            <h1>404-Page Not Found</h1>
            <Link to="/">Return to Home Page</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default PageNotFound;
