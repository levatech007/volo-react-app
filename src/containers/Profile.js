import React, { Component } from "react";
import $ from "jquery";
import Auth from "j-toker"
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/minimal-example.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
    }
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
        this.setState({ calendar: data.calendars })
      },
      error: (data) => {
      }
    });
  }

  render(){
    return(
      <div className="container">
        <div className="row background">
          {Auth.user.name && <h2>Welcome, { Auth.user.name }!</h2>}
          <div className="col-12">
            { this.state.calendar.notes &&
            <Accordion>
              {this.state.calendar.map(oneEntry => {
                  return(<AccordionItem>
                          <AccordionItemTitle>
                            <h4>{ oneEntry.date.weekday }, { oneEntry.date.day } { oneEntry.date.monthname }</h4>
                            <img src={ oneEntry.icon_url } alt = "" />
                          </AccordionItemTitle>
                          <AccordionItemBody>
                            <p>Weather conditions: </p>
                            <ul>
                              <li>High: { oneEntry.high.fahrenheit }F/ Low: { oneEntry.low.fahrenheit }F</li>
                              <li>Winds: { oneEntry.avewind.mph }mph</li>
                            </ul>
                            <p>{ oneEntry.notes }</p>
                          </AccordionItemBody>
                        </AccordionItem>)
                  })
                }
              </Accordion>
            }
            </div>
        </div>
      </div>
    )
  }
}

export default Profile;
