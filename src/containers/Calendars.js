import React, { Component } from 'react';
import Auth from "j-toker";
import Location from "../components/Location.js";
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody, } from "react-accessible-accordion";
import "react-accessible-accordion/dist/minimal-example.css";

class Calendars extends Component {
  constructor(){
    super();
    this.state = {
      location: {},
      weatherForecast: [],
      userId: 0,
      reviewCount: 0,
    }
    this.createCalendarEntry = this.createCalendarEntry.bind(this);
  }

  componentWillMount() {
    Auth.validateToken()
    .then((user) => {
      this.setState({
        userId: user.id,
      })
    })
  }

  componentDidMount() {
    let locationId = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}.json`)
    .then((res) => {
      return res.json();
    }).then ((location) => {
      this.setState({
        location: location,
        reviewCount: location.reviews.length,
       })
    })
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}/weather.json`)
    .then((res) => {
      return res.json();
    }).then((forecast) => {
      console.log(forecast)
      this.setState({ weatherForecast: forecast })
    })
  }

  createCalendarEntry(id) {
    console.log(id)

    // $.ajaxSetup({
    //   beforeSend(xhr, settings) {
    //     Auth.appendAuthHeaders(xhr, settings);
    //   }
    // });
    // $.post({ // still need be set up
    //   url: `${process.env.REACT_APP_BACKEND_URL}/calendars`,
    //   data: {
    //     location: this.state.location.name,
    //     weekday: weather.date.weekday,
    //     day: weather.date.day,
    //     month: weather.date.monthname,
    //     notes: notes,
    //     icon_url: weather.icon_url,
    //   },
    //   success: (response) => {
    //       this.props.history.push(`/users/${this.state.userId}`)
    //   },
    // })
  }

  render() {
    return (
      <div className="container">
        <div className="row background">
          <div className="col-md-12">
            { this.state.location.latitude && <Location location={ this.state.location } reviewCount={ this.state.reviewCount}/> }
            {this.state.weatherForecast[0] && <Accordion>
              {this.state.weatherForecast.map(oneDay => {
                  return(<AccordionItem>
                          <AccordionItemTitle>
                            <div className="row">
                              <div className="col-md-6">
                                <h4>{ oneDay.day_of_week }, { oneDay.month } { oneDay.day }</h4>
                              </div>
                              <div className="col-md-2 offset-md-4">
                                <img className="weather-icon" src={ require(`../images/weather-icons/${oneDay.conditions_icon}.svg`)} alt = "" />
                              </div>
                            </div>
                          </AccordionItemTitle>
                          <AccordionItemBody>
                            <p>Weather conditions: </p>
                            <ul>
                              <li>High: { oneDay.high_temp}F/ Low: { oneDay.low_temp }F</li>
                              <li>Winds: { oneDay.wind_dir } { oneDay.wind_speed }mph</li>
                            </ul>
                            <textarea className="form-control" ref="notes"rows="3"></textarea>
                            <button onClick={ this.createCalendarEntry(oneDay.id) } className="btn btn-primary"> + </button>
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

export default Calendars;
