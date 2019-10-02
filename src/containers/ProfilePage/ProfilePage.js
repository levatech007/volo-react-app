import React, { Component } from "react";
import $                    from "jquery";
import Auth                 from "j-toker";
import HamburgerMenu        from "../../components/HamburgerMenu/HamburgerMenu.js"
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
      tabs: ["Feed", "Upcoming Events", "Past Events"],
      currentEvents:          [],
      pastEvents:             [],
      reviews:                [],
      profileImageUrl:        "",
      activeTabIndex:         0,
      updateProfileModalOpen: false,
      imageUploadModalOpen:   false,
      deleteAcctWindow:       {
                                "content":  "Are you sure you want to delete your account?",
                                "title":    "Delete Account",
                                buttonText: "Yes, delete account"
                              },
      showDeleteAccountModal:  false,
    }
    this.sortCalendar = this.sortCalendar.bind(this)
    this.sortCalendarEntriesByDate = this.sortCalendarEntriesByDate.bind(this)
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
          console.log(data)
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
    this.sortCalendarEntriesByDate(pastEvents)
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
              <div className="menu-bar-wrapper">
                  {
                    this.state.tabs.map((tab, idx) => {
                      return(
                        <div className="menu-bar-tab" key={ idx }>{ tab }</div>
                      )
                    })
                  }
              </div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
          </div>
        </div>
    )
  }
}

export default ProfilePage
