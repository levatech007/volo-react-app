import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import ContactModal from "./ContactModal.js";
import Alerts from "./Alerts.js"
// dynamic image loading with webpack & require, step 1:
function importAll(r) {
  let images = {}
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item) })
  return images
}

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      showContactModal: false,
      email: "",
      alert: false,
      alertStyle: "",
      alertMsg: "",
      footerLinks: [
                    {page: "Locations", route: "locations"},
                    {page: "About", route: "about"},
                    {page: "Log In", route: "login"},
                    {page: "Sign Up", route: "signup"},
                    {page: "API", route: "api"}
                  ],
      socialMedia: [
                    {accountName: "instagram", url: "http://instagram.com"},
                    {accountName: "twitter", url: "http://twitter.com"},
                    {accountName: "facebook", url: "http://facebook.com"}
                  ]
    }
    this.toggleContactModal = this.toggleContactModal.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onEmailListSubmit = this.onEmailListSubmit.bind(this);
  }

  toggleContactModal() {
    this.setState({
      showContactModal: !this.state.showContactModal
    })
  }

  onEmailInputChange(e) {
    this.setState({
        showContactModal: this.state.showContactModal,
        email: e.target.value,
    })
  }

  onEmailListSubmit(e) {
    e.preventDefault();
    console.log(this.state.email)
    let email = this.state.email
    this.setState({
      showContactModal: this.state.showContactModal,
      email: "",
    })
    $.post({
      url: `${process.env.REACT_APP_BACKEND_URL}/subscribe`,
      data: {
        email: email
      },
      success: (data) => {
        this.setState({
          alert: true,
          alertStyle: "alert alert-success",
          alertMsg: "Thank you!",
        })
      },
      error: (error) => {
        this.setState({
          alert: true,
          alertStyle: "alert alert-danger",
          alertMsg: "Oops...",
        })
      }
    })
  }

  render() {
    // dynamic image loading with webpack & require, step 2:
    const images = importAll(require.context('../images/social_icons', false, /\.(png|jpe?g|svg)$/));
    console.log(images)
    return(
      <div className="row justify-content-center footer-background">
        <div className="container">
          { this.state.showContactModal ? <ContactModal toggleContactModal={ this.toggleContactModal }/> : null }
          <div className="row justify-content-center">
            <div className="col-lg-2 col-md-6">
              <p>VOLO</p>
              <div className="row">
                <ul>
                  {
                    this.state.footerLinks.map((link, idx) => {
                      return(
                        <li key={ idx }><Link to={ `/${ link.route }` } className="footer-link">{ link.page }</Link></li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <p>CONNECT</p>
              <br></br>
              <div className="row">
                {
                  this.state.socialMedia.map((account, idx) => {
                    return(
                      <div className="col-3" key={ idx }>
                        <a href={ account.url }><img src={ images[`${ account.accountName }-logo.png`] } alt={ `${ account.accountName }-icon` }></img></a>
                      </div>
                    )
                  })
                }

              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <p>STAY TUNED</p>
              <br></br>
              <div className="row">
                <div className="col-12">
                  { this.state.alert ?
                  <Alerts style={ this.state.alertStyle } alert={ this.state.alertMsg } /> : null
                  }
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <input
                    type="email"
                    className="form-control"
                    onChange={this.onEmailInputChange}
                    placeholder="Join our email list"
                  />
                </div>
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-light"
                    onClick={ this.onEmailListSubmit }>Submit</button>
                </div>
              </div>
              <small className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="col-lg-2 col-md-6 offset-md-1">
                <p>CONTACT</p>
                <br></br>
                <button className="plain-button" onClick={ this.toggleContactModal }>Contact Us</button>
            </div>
          </div>
          <div className="row justify-content-center copyright">
            <small>&copy; {(new Date()).getFullYear()} VOLO All rights reserved</small>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
