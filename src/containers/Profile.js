import React, { Component } from "react";
import $ from "jquery";
import Auth from "j-toker";
import { Accordion,AccordionItem,AccordionItemTitle,AccordionItemBody,} from "react-accessible-accordion";
import UpdateProfileModal from "../components/UpdateProfileModal.js";
import Profileimg from "../images/profile-img.png";


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
      reviews: [],
      date: null,
      menuTabs: ["Upcoming events", "Past events", "My reviews"],
      updateProfileModalOpen: false,
    }
    this.openUpdateProfileModal = this.openUpdateProfileModal.bind(this);
    this.closeUpdateProfileModal = this.closeUpdateProfileModal.bind(this);
    this.onUpdateAccount = this.onUpdateAccount.bind(this);
    this.onDeleteAccount = this.onDeleteAccount.bind(this);
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
        this.setState({
          calendar: data.calendars,
          reviews: data.reviews
        })
      },
      error: (data) => {
        console.log(data)
      }
    });

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) { dd = "0"+dd}
    if(mm<10) {mm = "0"+mm}
    today = `${ mm }/${ dd }/${ yyyy }`
    this.setState({ date: today})
  }

  openUpdateProfileModal() {
    this.setState({
      updateProfileModalOpen: true
    });

  }

  closeUpdateProfileModal() {
    this.setState({
      updateProfileModalOpen: false
    });

  }

  onUpdateAccount(newData) {
    Auth.updateAccount({
      name: newData.name,
      image: newData.image
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
    return(
      <div className="container">
        <div className="row background">
          <div className="col-4">
          <img src={ Profileimg } alt="profile"/>
          </div>
          { this.state.updateProfileModalOpen ? <UpdateProfileModal close={ this.closeUpdateProfileModal}  /> : null }
          <div className="col-8">
            {Auth.user.name && <h2>Welcome, { Auth.user.name }!</h2>}
            <p> Today is { this.state.date }</p>
            <button className="btn btn-outline-light" onClick={ this.onDeleteAccount }>
              <i className="far fa-trash-alt"></i>
            </button>
            <button className="btn btn-outline-light" onClick={ this.openUpdateProfileModal }>
              <i className="far fa-edit"></i>
            </button>
          </div>
          <div className="col-12">
            <div className="row">
              {
                this.state.menuTabs.map((tab, idx) => {
                  return( <div className="col-md-4"><h3>{ tab }</h3></div> )
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
