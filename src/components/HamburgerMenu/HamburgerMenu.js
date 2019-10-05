import React, { Component } from "react";
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
          <div onClick={ this.props.onUpdate }>
            <img src={ require('./Images/edit-icon.svg') } alt="edit-button"/>
          </div>
        </div>
        <div className="menu-link" onClick={ this.toggleNavMenu }>
          <div onClick={ this.props.onDelete }>
            <img src={ require('./Images/delete-icon.svg') } alt="delete-button"/>
          </div>
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
