import React, { Component } from "react";
import { Link } from "react-router-dom";
import Instagram from "../images/social_icons/instagram-logo.png";
import Twitter from "../images/social_icons/twitter-logo.png";
import Facebook from "../images/social_icons/facebook-logo.png";

class Footer extends Component {
  render() {
    return(
      <div className="row justify-content-center footer-background">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-2">
            <ul>
              <li>VOLO</li>
              <br></br>
              <li><Link to={ '/locations' } >Locations</Link></li>
              <li><Link to={ '/about' } >About</Link></li>
              <li><Link to={ '/login' } >Log In</Link></li>
              <li><Link to={ '/login' } >Sign Up</Link></li>
            </ul>
          </div>
          <div className="col-sm-2">
              <p>CONNECT</p>
              <br></br>
              <img src={ Instagram }></img>
              <img src={ Twitter }></img>
              <img src={ Facebook }></img>
          </div>
          <div className="col-sm-4">
            <ul>
              <li>STAY TUNED</li>
              <br></br>
              <form>
                <div className="form-group">
                  <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter your email ..."/>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              </form>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul>
              <li>CONTACT</li>
              <br></br>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="row justify-content-center">
          <small>&copy; 2018 VOLO All rights reserved</small>
        </div>
      </div>
    </div>
    )
  }
}

export default Footer;
