import React, { Component } from "react";
import { AccordionItem, AccordionItemTitle, AccordionItemBody, } from "react-accessible-accordion";

class SingleDayWeather extends Component {
  constructor() {
    super();
    this.state = {
      notes: "",
    }
    this.onNotesInputChange = this.onNotesInputChange.bind(this);
    this.addCalendarEntry = this.addCalendarEntry.bind(this);
  }

  onNotesInputChange(e) {
      this.setState({
        notes: e.target.value
      })
  }

  addCalendarEntry(e) {
    e.preventDefault();
    let oneDay =  this.props.oneDay;
    let notes = this.state.notes;
    this.props.createCalendarEntry(oneDay, notes);
  }

  render() {
    return(
            <AccordionItem>
              <AccordionItemTitle>
                <div className="row">
                  <div className="col-md-6">
                    <h4>{ this.props.oneDay.day_of_week }, { this.props.oneDay.month } { this.props.oneDay.day }</h4>
                  </div>
                  <div className="col-md-2 offset-md-4">
                    <img className="weather-icon" src={ require(`../images/weather-icons/${this.props.oneDay.conditions_icon}.svg`)} alt = "" />
                  </div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <p>Weather conditions: </p>
                <ul>
                  <li>High: { this.props.oneDay.high_temp}F/ Low: { this.props.oneDay.low_temp }F</li>
                  <li>Winds: { this.props.oneDay.wind_dir } { this.props.oneDay.wind_speed }mph</li>
                </ul>
                <textarea
                  className="form-control"
                  ref="notes"
                  rows="3"
                  onChange={this.onNotesInputChange}
                  />
                <button onClick={ this.addCalendarEntry } className="btn btn-primary"> + </button>
              </AccordionItemBody>
            </AccordionItem>
    )
  }
}

export default SingleDayWeather;
