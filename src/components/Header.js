import React, { Component } from "react";
import { withRouter }       from "react-router-dom";
import { Link }             from "react-router-dom";
import Auth                 from "j-toker";

class Header extends Component {
  constructor() {
    super();
    this.onUserLogOut = this.onUserLogOut.bind(this);
  }

  onUserLogOut(e) {
    Auth.signOut()
    .then((resp) => {
      this.props.history.push("/login")
    })
    .fail((resp) => {
      console.log(resp) // give error msg
    });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to={ '/' } className="navbar-brand" >VOLO</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            { Auth.user.id ?
              (<ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={ '/locations' } className="nav-link" >Locations</Link>
                </li>
                <li className="nav-item">
                  <Link to={ '/about' } className="nav-link" >About</Link>
                </li>
                <li className="nav-item">
                  <Link to={ `/users/${ Auth.user.id }` } className="nav-link" >Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={ this.onUserLogOut } className="nav-link btn btn-outline-dark">Log Out, { Auth.user.name }</button>
                </li>
              </ul>) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to={ '/locations' } className="nav-link" >Locations</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={ '/about' } className="nav-link" >About</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={ '/login' } className="nav-link" >Log In</Link>
                  </li>
                </ul>
              )
            }
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
