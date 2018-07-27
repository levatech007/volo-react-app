import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return(
      <div className="container footer-background">
        <div className="row justify-content-center">
          <div className="col-sm-3">
            <ul>
              <li>VOLO</li>
              <br></br>
              <li>Locations</li>
              <li>About</li>
              <li>Log In</li>
              <li>Sign Up</li>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul>
              <li>CONNECT</li>
              <br></br>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul>
              <li>STAY TUNED</li>
              <br></br>
              <li>Email field</li>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul>
              <li>CONTACT</li>
              <br></br>
              <li>Form</li>
            
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
