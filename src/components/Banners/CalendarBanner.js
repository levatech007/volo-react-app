import React, { Component } from "react";
import "./banner.css";

class CalendarBanner extends Component {
  constructor() {
      super();
      this.state = {
        showExtendedContent: false,
        calendarBannerClass: "banner",
        extendedContentClass: "extended-banner",
      }
      this.renderExtendedContent = this.renderExtendedContent.bind(this)
      this.toggleExtendedContent = this.toggleExtendedContent.bind(this)
  }

  renderExtendedContent() {
    return(
      <div className={ this.state.extendedContentClass }>
        <div className="extended-full-width">
          <p>{ this.props.entry.notes }</p>
        </div>
      </div>
    )
  }

  toggleExtendedContent() {
    this.setState({
      showExtendedContent: !this.state.showExtendedContent,
     })
    if(this.state.showExtendedContent) {
      this.setState({
        calendarBannerClass: "banner slide-up",
        extendedContentClass: "extended-banner fade-out",
       })
    } else {
      this.setState({
        calendarBannerClass: "banner slide-down",
        extendedContentClass: "extended-banner fade-in",
       })
    }
  }

  render() {
    console.log(this.props.entry)
    return(
      <div className={ `${ this.state.calendarBannerClass } calendar-banner` }>
        <div className="top-content">
          <div className="review-title">
            <h4>{ this.props.entry.location }</h4>
            <p>{ this.props.entry.day } { this.props.entry.month }</p>
          </div>
        </div>
        <div className="expand-button">
          <button onClick={ this.toggleExtendedContent } className="plain-button expand-btn">
            { this.state.showExtendedContent ? "-" : "+" }
          </button>
        </div>
        { this.state.showExtendedContent && this.renderExtendedContent() }
      </div>
    )
  }
}

export default CalendarBanner
