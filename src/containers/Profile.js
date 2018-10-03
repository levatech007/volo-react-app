import React, { Component } from "react";
import $ from "jquery";
import Auth from "j-toker"
import { Accordion,AccordionItem,AccordionItemTitle,AccordionItemBody,} from "react-accessible-accordion";
import Profileimg from "../images/profile-img.png"


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
      date: null,
    }
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
        this.setState({ calendar: data.calendars })
      },
      error: (data) => {
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

  onDeleteAccount() {
    if (window.confirm("Are you sure you wish to delete your account?")) {
      Auth.destroyAccount();
      Auth.signOut();
      this.props.history.push("/")
    }
  }

  render(){
    console.log(this.state.calendar)
    return(
      <div className="container">
        <div className="row background">
          <div className="col-4">
          <img src={ Profileimg } alt="profile"/>
        </div>
          <div className="col-8">
            {Auth.user.name && <h2>Welcome, { Auth.user.name }!</h2>}
            <p> Today is { this.state.date }</p>
            <button className="btn btn-outline-light" onClick={ this.onDeleteAccount }>
              <i className="far fa-trash-alt" onClick={ this.onDeleteAccount }></i>
            </button>
          </div>
          <div className="col-12">
            <h3>Upcoming events:</h3>
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
