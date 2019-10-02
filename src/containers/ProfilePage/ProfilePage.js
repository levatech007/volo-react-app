import React, { Component } from "react";
import $                    from "jquery";
import Auth                 from "j-toker";
import HamburgerMenu        from "../../components/HamburgerMenu/HamburgerMenu.js";
import Tabs                 from "../../components/Tabs/Tabs.js";
import CalendarAccordion    from "../../components/Accordions/CalendarAccordion.js";
import ReviewsAccordion     from "../../components/Accordions/UserReviewsAccordion.js";
// import Tabs                 from "../components/Tabs/Tabs.js";
// import UpdateProfile        from "../components/Forms/ProfileUpdateForm.js";
// import ImageUploadModal     from "../components/ImageUploadModal.js";
// import Profileimg           from "../images/profile-img.png";
// import CalendarAccordion    from "../components/Accordions/CalendarAccordion.js";
// import ReviewsAccordion     from "../components/Accordions/UserReviewsAccordion.js";
// import Modal                from "../components/Modal/Modal.js";
import "./Styles/profile-page.css";

class ProfilePage extends Component {
  constructor() {
    super()
    this.state = {
      tabs:                   ["Upcoming Events", "Past Events", "Feed"],
      currentEvents:          [],
      pastEvents:             [],
      reviews:                [],
      profileImageUrl:        "",
      activeTabIndex:         1,
      updateProfileModalOpen: false,
      imageUploadModalOpen:   false,
      deleteAcctWindow:       {
                                "content":  "Are you sure you want to delete your account?",
                                "title":    "Delete Account",
                                buttonText: "Yes, delete account"
                              },
      showDeleteAccountModal:  false,
    }
    this.sortCalendar              = this.sortCalendar.bind(this)
    this.sortCalendarEntriesByDate = this.sortCalendarEntriesByDate.bind(this)
    this.handleTabsClick           = this.handleTabsClick.bind(this)
    this.renderActiveTabContent    = this.renderActiveTabContent.bind(this)
  }

  componentDidMount() {
    // determine if the current user is the same as the profile page viewer
    // to distinguish between public and personal profile
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

    // console.log(this.state.pastEvents[0])
    // console.log(this.state.currentEvents[0])

    if(this.state.activeTabIndex === 0) {
      return(
        <div>
        { this.state.currentEvents[0] ?
          <CalendarAccordion calendarEvents={ this.state.currentEvents } />
          :
          <p>You have no upcoming calendar entries yet!</p>
        }
      </div>
      )
    } else if (this.state.activeTabIndex === 1) {
        return(
          <div>
          {this.state.pastEvents[0] ?
            <CalendarAccordion calendarEvents={ this.state.pastEvents } />
            :
            <p>You have no past calendar entries!</p>
          }
        </div>
      )
    } else if (this.state.activeTabIndex === 2) {
      return(
        <div>
        {this.state.reviews[0] ?
          <ReviewsAccordion reviews={ this.state.reviews } />
          :
          <p>You have no reviews yet!</p>
        }
      </div>
      )
    }
  }

  render() {
    return(
      <div className="container">
        <div className="profile-background">
          <div className="profile-header-img">
          </div>
          {/* LEFT COLUMN */}
          <div className="profile-left-col">
              <div className="profile-image">
              <img
              src={require('./Images/profile-img-placeholder.png')}
              alt="profile"/>
            </div>

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
              <p>Feature</p>
              <p>Feature</p>
            </div>
            {/* RIGHT COLUMN */}
            <div className="profile-right-col">
              <HamburgerMenu/>
              <div className="profile-header">
                <div><h3>Name Here</h3></div>
              </div>
              <h5>Location</h5>
              {/* <div className="menu-bar-wrapper">
                  {
                    this.state.tabs.map((tab, idx) => {
                      return(
                        <div className="menu-bar-tab" key={ idx }>{ tab }</div>
                      )
                    })
                  }
              </div> */}
              <Tabs
                handleTabsClick={ this.handleTabsClick }
                tabs={ this.state.tabs }
              />
              { this.renderActiveTabContent() }
            </div>
          </div>
        </div>
    )
  }
}

export default ProfilePage
