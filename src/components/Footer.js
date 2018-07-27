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
                <li><Link to={ '/locations' } className="footer-link" >Locations</Link></li>
                <li><Link to={ '/about' } className="footer-link" >About</Link></li>
                <li><Link to={ '/login' } className="footer-link" >Log In</Link></li>
                <li><Link to={ '/login' } className="footer-link" >Sign Up</Link></li>
              </ul>
            </div>
            <div className="col-sm-2">
              <p>CONNECT</p>
              <br></br>
              <div className="row">
                <div className="col-3">
                  <a href="..."><img src={ Instagram }></img></a>
                </div>
                <div className="col-3">
                  <a href="..."><img src={ Twitter }></img></a>
                </div>
                <div className="col-3">
                  <img src={ Facebook }></img>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <p>STAY TUNED</p>
              <br></br>
              <div className="row">
                <div className="col-8">
                  <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter your email ..."/>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="col-sm-3">
              <ul>
                <li>CONTACT</li>
                <br></br>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="row justify-content-center copyright">
            <small>&copy; 2018 VOLO All rights reserved</small>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
