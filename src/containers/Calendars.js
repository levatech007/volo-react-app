import React, { Component } from 'react';
import $ from "jquery";
import Auth from "j-toker";
import Location from "../components/Location.js";
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/minimal-example.css";

class Calendars extends Component {
  constructor(){
    super();
    this.state = {
      location: {},
      weatherForecast: [],
      userId: 0,
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
    // fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}.json`)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}/weather.json`)
    .then((res) => {
      console.log(res)
      return res.json();
    }).then((forecast) => {
      console.log(forecast)
      this.setState({ weatherForecast: forecast })
    })
  }

  createCalendarEntry(entry, notes, weather) {
    $.ajaxSetup({
      beforeSend(xhr, settings) {
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    $.post({
      url: `${process.env.REACT_APP_BACKEND_URL}/calendars`,
      data: {
        location: this.state.location.name,
        weekday: weather.date.weekday,
        day: weather.date.day,
        month: weather.date.monthname,
        notes: notes,
        icon_url: weather.icon_url,
      },
      success: (response) => {
          this.props.history.push(`/users/${this.state.userId}`)
      },
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row background">
          { this.state.location.latitude && <Location location={ this.state.location } /> }
          <Accordion>
            {this.state.weatherForecast.map(oneDay => {
                return(<AccordionItem>
                        <AccordionItemTitle>
                          <h4>{ oneDay.day_of_week }, { oneDay.day } { oneDay.month }</h4>
                          {/* <img src={ oneDay.icon_url create function to select img? } alt = "" /> */}
                        </AccordionItemTitle>
                        <AccordionItemBody>
                          <p>Weather conditions: </p>
                          <ul>
                            <li>High: { oneDay.temp}F/ Low: { oneDay.temp }F</li>
                            <li>Winds: { oneDay.wind_dir } { oneDay.wind_speed }mph</li>
                          </ul>
                          <textarea class="form-control" ref="notes"rows="3"></textarea>
                          <button onClick={ this.onSubmitEntry } className="btn btn-primary"> + </button>
                        </AccordionItemBody>
                      </AccordionItem>)
                  })
                }
              </Accordion>
        </div>
      </div>
    )
  }
}

export default Calendars;
