import React, { Component } from "react";
import $                    from "jquery";
import Auth                 from "j-toker";
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
                    menuTabs:               [
                                              { name: "Upcoming events", type: "calendar" },
                                              { name: "Past events", type: "calendar" },
                                              { name: "My reviews", type: "reviews"}
                                            ],
                    updateProfileModalOpen: false,
                    imageUploadModalOpen:   false
                  }
    this.toggleUpdateProfileModal = this.toggleUpdateProfileModal.bind(this);
    this.toggleImageUploadModal   = this.toggleImageUploadModal.bind(this);
    this.showTabContent           = this.showTabContent.bind(this);
    this.onUpdateAccount          = this.onUpdateAccount.bind(this);
    this.onDeleteAccount          = this.onDeleteAccount.bind(this);
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
        //let images = data.images //array
        //let avatar = images[images.length - 1].avatar.url
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

    var today = new Date();
    var dd    = today.getDate();
    var mm    = today.getMonth()+1; //January is 0!
    var yyyy  = today.getFullYear();
    if(dd<10) { dd = "0"+dd}
    if(mm<10) {mm = "0"+mm}
    today = `${ mm }/${ dd }/${ yyyy }`
    this.setState({ date: today})
  }

  toggleUpdateProfileModal() {
    this.setState({ updateProfileModalOpen: !this.state.updateProfileModalOpen });
  }

  toggleImageUploadModal() {
    this.setState({ imageUploadModalOpen: !this.state.imageUploadModalOpen });
  }

  showTabContent(tab) {
    console.log(tab)

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
            <div className="row">
              {
                this.state.menuTabs.map((tab, idx) => {
                  return( <div className="col-md-4" key={ idx } onClick={ () => this.showTabContent(tab) }><h3>{ tab.name }</h3></div> )
                })
              }
            </div>

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
        </div>
      </div>
    )
  }
}

export default Profile;
