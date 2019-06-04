import React, { Component } from "react";
import { withRouter }       from "react-router-dom";
import { Link }             from "react-router-dom";
import Auth                 from "j-toker";
import "./navbar.css";

class Navbar extends Component {
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
      <nav className="nav-position">
        <Link to={ '/' } >VOLO</Link>
        <Link to={ '/locations' }>Locations</Link>
        <Link to={ '/about' }>About</Link>
        { Auth.user.id ? <Link to={ `/users/${ Auth.user.id }` }>Profile</Link> : null }
        { Auth.user.id ? <button onClick={ this.onUserLogOut } className="nav-btn">Log Out, { Auth.user.name }</button> : null }
      </nav>
    );
  }
}

export default Navbar;
