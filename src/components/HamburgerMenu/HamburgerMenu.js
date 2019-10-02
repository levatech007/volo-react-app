import React, { Component } from "react";
import { Link }             from "react-router-dom";
import "./hamburger-menu.css";

class HamburgerMenu extends Component {
  constructor() {
    super();
    this.state = {
      showNavMenu: false,
    }
    this.toggleNavMenu = this.toggleNavMenu.bind(this);
  }

  toggleNavMenu() {
    // turn hamburger menu to 'X' and show nav menu box
    this.setState({ showNavMenu: !this.state.showNavMenu })
  }

  renderNavMenu() {
    return(
      <div className="nav-menu">
        <div className="menu-link" onClick={ this.toggleNavMenu }>
          <Link to={ "" }>
            <img src={ require('./Images/edit-icon.svg') }/>
          </Link>
        </div>
        <div className="menu-link" onClick={ this.toggleNavMenu }>
          <Link to={ "" }>
            <img src={ require('./Images/delete-icon.svg') }/>
          </Link>
        </div>

      </div>
    )
  }

  render() {
    return(
        <nav>

          <div
          className={ this.state.showNavMenu ? "hamburger-menu open" : "hamburger-menu" }
          onClick={ this.toggleNavMenu }>
          <span></span>
          <span></span>
          <span></span>
          { this.state.showNavMenu ? this.renderNavMenu() : null }
        </div>
        </nav>
    )
  }
}

export default HamburgerMenu
