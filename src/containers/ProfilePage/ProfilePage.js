import React, { Component } from "react";
import $                    from "jquery";
import Auth                 from "j-toker";
import HamburgerMenu        from "../../components/HamburgerMenu/HamburgerMenu.js";
import Tabs                 from "../../components/Tabs/Tabs.js";
import CalendarAccordion    from "../../components/Accordions/CalendarAccordion.js";
import ReviewsAccordion     from "../../components/Accordions/UserReviewsAccordion.js";
import UpdateProfile        from "../../components/Forms/ProfileUpdateForm.js";
import Modal                from "../../components/Modal/Modal.js";
import ImageUpload          from "../../components/ImageUploadModals/ImageUpload.js"
import "./Styles/profile-page.css";

class ProfilePage extends Component {
  constructor() {
    super()
    this.state = {
      tabsDisplayTitles:         ["Upcoming Events", "Past Events", "My Reviews"], // order is important!!!
      tabs:                      ["currentEvents", "pastEvents"],
      currentEvents:             [],
      pastEvents:                [],
      reviews:                   [],
      todaysDate:                new Date(),
      profileImageUrl:           "",
      bannerImageName:           "building-plane.jpg",
      activeTabIndex:            0,
      showUpdateProfileWindow:   false,
      showImageUploadWindowOpen: false,
      deleteAcctWindow:          {
                                    "content":  "Are you sure you want to delete your account?",
                                    "title":    "Delete Account",
                                    buttonText: "Yes, delete account"
                                  },
      showDeleteAccountWindow:    false,
      onHover:                    false,
      showBannerUpdateWindow:     false,
    }
    this.sortCalendar              = this.sortCalendar.bind(this)
    this.sortCalendarEntriesByDate = this.sortCalendarEntriesByDate.bind(this)
    this.handleTabsClick           = this.handleTabsClick.bind(this)
    this.renderActiveTabContent    = this.renderActiveTabContent.bind(this)
    this.toggleUpdateProfileWindow = this.toggleUpdateProfileWindow.bind(this)
    this.toggleDeleteConfirmWindow = this.toggleDeleteConfirmWindow.bind(this)
    this.onHoverEnterClass         = this.onHoverEnterClass.bind(this)
    this.onHoverLeaveClass         = this.onHoverLeaveClass.bind(this)
    this.toggleUpdateBannerWindow  = this.toggleUpdateBannerWindow.bind(this)
    this.handleBannerImageChange   = this.handleBannerImageChange.bind(this)
    this.onUpdateAccount           = this.onUpdateAccount.bind(this);
    this.onDeleteAccount           = this.onDeleteAccount.bind(this);
  }

  componentDidMount() {
    // determine if the current user is the same as the profile page viewer
    // to distinguish between public and personal profile
    // make sure user has given permission for showing public profile 
    let userId = this.props.match.params.id
    // if there is a user id
    if(userId) {
      $.ajaxSetup({
        beforeSend(xhr, settings) {
          Auth.appendAuthHeaders(xhr, settings);
        }
      })
      $.get({
        url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
        success: (data) => {
          //let images = data.images //array
          //let avatar = images[images.length - 1].avatar.url
          let sortedCalendar = this.sortCalendar(data.calendars)
          this.setState({
                          currentEvents: sortedCalendar.currentEvents,
                          pastEvents: sortedCalendar.pastEvents,
                          reviews:  data.reviews,
                          //profileImageUrl: avatar, // currently selecting the last image added
                        })
        },
        error: (data) => {
          this.props.history.push("/login")
        }
      })
    } else {
      console.log("No user found")
    }
  }

  sortCalendar(calendar) {
    // separate current + past calendar events
    // sort each set by date
    let pastEvents = []
    let currentEvents = []
    calendar.map(entry => {
      let calendarEntryDate = new Date(entry.date)
      if(calendarEntryDate >= this.state.todaysDate) {
        currentEvents.push(entry)
      } else {
        pastEvents.push(entry)
      }
    })
    return {
      pastEvents: this.sortCalendarEntriesByDate(pastEvents),
      currentEvents: this.sortCalendarEntriesByDate(currentEvents),
    }
  }

  sortCalendarEntriesByDate(entries) {
    let sortedCalendar = entries.sort((day1,day2) => {
                          let selectedDay = new Date(day1.date)
                          let nextDay = new Date(day2.date)
                          return nextDay - selectedDay
                        });
    return sortedCalendar
  }

  handleTabsClick(activeTabIdx) {
    this.setState({
      activeTabIndex: activeTabIdx
    })
  }

  renderActiveTabContent() {
    if(this.state.activeTabIndex === 0 || this.state.activeTabIndex === 1) {
      let displayTab = this.state.tabs[this.state.activeTabIndex]
      return(
          <div>
          { displayTab.length ?
            <CalendarAccordion calendarEvents={ this.state[displayTab] } />
            :
            <p>You have no calendar entries to show yet!</p>
          }
        </div>
        )
    } else {
      return(
        <div>
        {this.state.reviews.length ?
          <ReviewsAccordion reviews={ this.state.reviews } />
          :
          <p>You have no reviews yet!</p>
        }
      </div>
      )
    }
  }

  handleBannerImageChange(imageName) {
    console.log(imageName)
    // update account
  }

  toggleUpdateProfileWindow() {
    this.setState({
      showUpdateProfileWindow: !this.state.showUpdateProfileWindow,
      onHover: false,
    })
  }

  toggleDeleteConfirmWindow() {
    this.setState({
      showDeleteAccountWindow: !this.state.showDeleteAccountWindow,
    })
  }

  toggleUpdateBannerWindow() {
    this.setState({ showBannerUpdateWindow: !this.state.showBannerUpdateWindow })
  }

  // Simply toggling the hover class does not work properly when modals open
  // and throw off the class. The class gets usually reversed.
  // For this reason the hover class has to be explicitly set
  // to true/false at mouse enter and leave!!!
  onHoverEnterClass() {
    this.setState({ onHover: true })
  }

  onHoverLeaveClass() {
    this.setState({ onHover: false })
  }

  onUpdateAccount(newData) {
    // Auth.updateAccount({
    //   name:          newData.name,
    //   location:
    //   image:         newData.image,
    //   banner_image:
    // })
  }

  onDeleteAccount() {
    // Auth.destroyAccount();
    // Auth.signOut();
    // this.props.history.push("/")
  }

  render() {
    let bannerImage = require(`./Images/${ this.state.bannerImageName }`)
    return(
      <div className="container">
        { this.state.showDeleteAccountWindow ?
          <Modal
            content={ this.state.deleteAcctWindow.content }
            title={ this.state.deleteAcctWindow.title }
            buttonText={ this.state.deleteAcctWindow.buttonText }
            close={ this.toggleDeleteConfirmWindow }
            submit={ this.onDeleteAccount }
          />
          :
          null
        }
        { this.state.showUpdateProfileWindow ?
          <UpdateProfile
            close={ this.toggleUpdateProfileWindow }
            submit={ this.onUpdateAccount }
          />
          :
            null
          }
        { this.state.showBannerUpdateWindow ?
          <ImageUpload
            submit={ this.handleBannerImageChange }
            close={ this.toggleUpdateBannerWindow }
           />
          :
          null
        }
        <div className="profile-background">
          <div className="profile-header-img"
            style={{ backgroundImage: `url(${ bannerImage })` }}
            onMouseEnter={this.onHoverEnterClass}
            onMouseLeave={this.onHoverLeaveClass}
            >
            <img
              className={ this.state.onHover ? "icon-show" : "icon-hide"  }
              onClick={ this.toggleUpdateBannerWindow }
              src={ require("./Images/edit-icon.svg") }/>
          </div>
          {/* LEFT COLUMN */}
          <div className="profile-left-col">
              <div className="profile-image">
              <img
              src={ require('./Images/profile-img-placeholder.png') }
              alt="profile"/>
            </div>
              <p>Upcoming features below:</p>
              <button className="follow-btn">+ Follow</button>
              <div className="followers">
                <div className="follower-column">
                  <p>FOLLOWERS</p>
                  <h4>125</h4>
                </div>
                <div className="follower-column">
                  <p>FOLLOWING</p>
                  <h4>354</h4>
                </div>
              </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="profile-right-col">
              <HamburgerMenu
                onUpdate={ this.toggleUpdateProfileWindow }
                onDelete={ this.toggleDeleteConfirmWindow }
              />
              <div className="profile-header">
                <div><h3>Welcome, { Auth.user.name }</h3></div>
              </div>
              <h5>My location</h5>
              <Tabs
                handleTabsClick={ this.handleTabsClick }
                tabs={ this.state.tabsDisplayTitles }
              />
              { this.renderActiveTabContent() }
            </div>
          </div>
        </div>
    )
  }
}

export default ProfilePage
