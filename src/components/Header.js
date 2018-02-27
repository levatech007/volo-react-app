import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "j-toker";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userSignedIn: false,
      userName: "",
      userId: 0,
    }
    this.onUserLogOut = this.onUserLogOut.bind(this);
  }

  componentDidMount() {
    Auth.validateToken()
    .then((user) => {
      this.setState({
        userSignedIn: user.signedIn,
        userName: user.name,
        userId: user.id,
      })
    })
  }

  onUserLogOut(e) {
    Auth.signOut()
    .then((resp) => {
      this.setState({
        userSignedIn: false,
        userName: "",
        userId: 0,
      })
    })
    .fail((resp) => {
      console.log(resp)
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
            { this.state.userSignedIn ?
              (<ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={ '/locations' } className="nav-link" >Locations</Link>
                </li>
                <li className="nav-item">
                  <Link to={ `/users/${ this.state.userId }` } className="nav-link" >Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={ this.onUserLogOut } className="nav-link btn btn-outline-dark">Log Out, { this.state.userName }</button>
                </li>
              </ul>) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to={ '/locations' } className="nav-link" >Locations</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={ '/login' } className="nav-link" >Log In</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={ '/login' } className="nav-link" >Sign Up</Link>
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

export default Header;
