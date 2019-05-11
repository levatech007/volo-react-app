import React, { Component } from "react";
import { Link }             from "react-router-dom";
import $                    from "jquery";
import Alert                from "./Alert/Alert.js";
import ContactForm          from "./Forms/ContactForm.js";

import "./Forms/form.css";
import "./Modal/modal.css";

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
                    email:            "",
                    alert:            false,
                    alertStyle:       "",
                    alertMessages:         "",
                    footerLinks:      [
                                        {page: "Locations", route: "locations"},
                                        {page: "About", route: "about"},
                                        {page: "Log In", route: "login"},
                                        {page: "API", route: "api"}
                                      ],
                    socialMedia:      [
                                        { accountName: "instagram", url: "http://instagram.com" },
                                        { accountName: "twitter", url: "http://twitter.com" },
                                        { accountName: "facebook", url: "http://facebook.com" }
                                      ]
                  }
    this.toggleContactForm  = this.toggleContactForm.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onEmailListSubmit  = this.onEmailListSubmit.bind(this);
  }

  toggleContactForm() {
    this.setState({ showContactModal: !this.state.showContactModal })
  }

  onEmailInputChange(e) {
    this.setState({ email: e.target.value })
  }

  onEmailListSubmit(e) {
    e.preventDefault();
    $.post({
      url: `${process.env.REACT_APP_BACKEND_URL}/subscribe`,
      data: { email: this.state.email },
      success: (data) => {
        this.setState({
                        email:      "",
                        alert:      true,
                        alertStyle: "alert-box ok",
                        alertMessages:   ["Thank you!"],
                      })
      },
      error: (error) => {
        this.setState({
                        email:      "",
                        alert:      true,
                        alertStyle: "alert-box error",
                        alertMessages:   ["Oops. Something went wrong. Please be sure that you entered a valid, existing email."],
                      })
      }
    })
  }

  render() {
    // dynamic image loading with webpack & require, step 2:
    const images = importAll(require.context('../images/social_icons', false, /\.(png|jpe?g|svg)$/));
    return(
      <footer className="footer-background">
        <div className="container">
        <div className="row justify-content-center footer">
          <div className="col-12">
          { this.state.showContactModal ? <ContactForm close={ this.toggleContactForm }/> : null }
          <div className="row justify-content-center">
            <div className="col-lg-2 col-md-6 col-10">
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
            <div className="col-lg-3 col-md-6 col-10">
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
            <div className="col-lg-4 col-md-6 col-10">
              <p>STAY TUNED</p>
              <br></br>
              <div className="row">
                <div className="col-12">
                  { this.state.alert ?
                  <Alert alertStyle={ this.state.alertStyle } alert={ this.state.alertMessages } /> : null
                  }
                </div>
              </div>
              <div className="row">
                  <input
                    type="email"
                    onChange={this.onEmailInputChange}
                    placeholder="Join our email list"
                  />
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="footer-btn submit"
                    onClick={ this.onEmailListSubmit }>Join</button>
              </div>
              <div className="row">
                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-10">
                <p>CONTACT</p>
                <br></br>
                <button className="plain-button" onClick={ this.toggleContactForm }>Contact Us</button>
            </div>
          </div>
        </div>
          <div className="row justify-content-center copyright">
            <small>&copy; {(new Date()).getFullYear()} VOLO All rights reserved</small>
          </div>
        </div>
      </div>
      </footer>
    )
  }
}

export default Footer;
