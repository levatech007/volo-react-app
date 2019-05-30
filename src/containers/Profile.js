import React, { Component } from "react";
import $                    from "jquery";
import Auth                 from "j-toker";
import Tabs                 from "../components/Tabs/Tabs.js";
import {
          Accordion,
          AccordionItem,
          AccordionItemTitle,
          AccordionItemBody,
        }                   from "react-accessible-accordion";
import UpdateProfile        from "../components/Forms/ProfileUpdateForm.js";
// import ImageUploadModal     from "../components/ImageUploadModal.js";
import Profileimg           from "../images/profile-img.png";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
                    calendar:               [],
                    reviews:                [],
                    profileImageUrl:        "",
                    date:                   null,
                    fullDate:               new Date(),
                    menuTabs:               ["Upcoming Events", "Past Events", "My Reviews"],
                    activeTabIndex:         0,
                    updateProfileModalOpen: false,
                    imageUploadModalOpen:   false
                  }
    this.toggleUpdateProfileModal = this.toggleUpdateProfileModal.bind(this);
    this.toggleImageUploadModal   = this.toggleImageUploadModal.bind(this);
    this.onUpdateAccount          = this.onUpdateAccount.bind(this);
    this.onDeleteAccount          = this.onDeleteAccount.bind(this);
    this.handleTabsClick          = this.handleTabsClick.bind(this);
    this.renderActiveTabContent   = this.renderActiveTabContent.bind(this);
    this.sortCalendar             = this.sortCalendar.bind(this);
  }

  componentDidMount() {
    let userId = this.props.match.params.id
    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.get({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
      success: (data) => {
        console.log(data)
        //let images = data.images //array
        //let avatar = images[images.length - 1].avatar.url
        let sortedCalendar = this.sortCalendar(data.calendars)
        this.setState({
                        calendar: data.calendars,
                        reviews:  data.reviews,
                        //profileImageUrl: avatar, // currently selecting the last image added
                      })
      },
      error: (data) => {
        // show error msg
      }
    });

    let dates = this.getTodaysDates()
    this.setState({
      date: dates.todayForDisplay,
      fullDate: dates.fullDate
    })
  }

  getTodaysDates() {
    let today = new Date();
    today.setHours(0,0,0,0) // for comparison with date from db, hours should be set to 0 (otherwise is will categorize today as past event)
    let dd    = today.getDate();
    let mm    = today.getMonth()+1; //January is 0!
    let yyyy  = today.getFullYear();
    if(dd<10) { dd = `0${ dd }`}
    if(mm<10) {mm = `0${ mm }`}
    let todayStr = `${ mm }/${ dd }/${ yyyy }`
    let dates = {
      todayForDisplay: todayStr,
      fullDate: today,
    }
    return dates
  }

  sortCalendar(calendar) {
    // separate current + past calendar events
    // sort each set by date
    let pastEvents = []
    let currentEvants = []
    calendar.map(entry => {
      console.log(this.state.fullDate)
      console.log(entry.date)
      console.log(entry.date > this.state.fullDate)
    })
  }

  sortCalendarEntriesByDate(entries) {

  }

  toggleUpdateProfileModal() {
    this.setState({ updateProfileModalOpen: !this.state.updateProfileModalOpen });
  }

  toggleImageUploadModal() {
    this.setState({ imageUploadModalOpen: !this.state.imageUploadModalOpen });
  }

  onUpdateAccount(newData) {
    Auth.updateAccount({
      name:   newData.name,
      image:  newData.image
    })
  }

  onDeleteAccount() {
    if (window.confirm("Are you sure you wish to delete your account?")) {
      Auth.destroyAccount();
      Auth.signOut();
      this.props.history.push("/")
    }
  }

  handleTabsClick(activeTabIdx) {
    this.setState({
      activeTabIndex: activeTabIdx
    })
  }

  renderActiveTabContent() {
    if(this.state.activeTabIndex === 0) {
      return(
        <div>
        {this.state.calendar[0] ?
        <Accordion>
          {this.state.calendar.map((oneEntry, idx) => {
              return(<AccordionItem key={ idx }>
                      <AccordionItemTitle>
                        <h4>{ oneEntry.weekday }, { oneEntry.day } { oneEntry.month } @ { oneEntry.location }</h4>
                        {/* <img src={ oneEntry.icon_url } alt = "" /> */}
                      </AccordionItemTitle>
                      <AccordionItemBody>
                        <p>Weather conditions: </p>
                        {/* <ul>
                          <li>High: { oneEntry.high.fahrenheit }F/ Low: { oneEntry.low.fahrenheit }F</li>
                          <li>Winds: { oneEntry.avewind.mph }mph</li>
                        </ul> */}
                        <p>{ oneEntry.notes }</p>
                      </AccordionItemBody>
                    </AccordionItem>)
              })
            }
          </Accordion>
          :
          <p>You have no calendar entries yet!</p>
        }
      </div>
      )
    } else if (this.state.activeTabIndex === 1) {
      return(
        <div>Past Events</div>
      )
    } else if (this.state.activeTabIndex === 2) {
      return(
        <div>My Reviews</div>
      )
    }
  }

  render(){
    console.log(this.state.calendar)
    console.log(this.state.reviews)
    return(
      <div className="container">
        <div className="row background">
          {/* { this.state.imageUploadModalOpen ? <ImageUploadModal close={ this.toggleImageUploadModal}  /> : null } */}
          <div className="col-4">
            <button onClick={ this.toggleImageUploadModal }>
              <img
                src={ this.state.profileImageUrl ? this.state.profileImageUrl : Profileimg }
                alt="profile"/>
            </button>
          </div>
          { this.state.updateProfileModalOpen ? <UpdateProfile close={ this.toggleUpdateProfileModal}  /> : null }
          <div className="col-8">
            {Auth.user.name && <h2>Welcome, { Auth.user.name }!</h2>}
            <p> Today is { this.state.date }</p>
            <button className="icon-btn" onClick={ this.onDeleteAccount }>
              <i className="far fa-trash-alt"></i>
            </button>
            <button className="icon-btn" onClick={ this.toggleUpdateProfileModal }>
              <i className="far fa-edit"></i>
            </button>
          </div>
          <div className="col-12">
            <Tabs
              handleTabsClick={ this.handleTabsClick }
              tabs={ this.state.menuTabs }
            />
            { this.renderActiveTabContent() }

          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
