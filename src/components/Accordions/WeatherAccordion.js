import React, { Component } from "react";
import {
          Accordion,
          AccordionItem,
          AccordionItemTitle,
          AccordionItemBody,
        }                   from "react-accessible-accordion";
import "react-accessible-accordion/dist/minimal-example.css";

class WeatherAccordion extends Component {
  render() {
    return(
      <Accordion>
        {this.state.props.weatherForecast.map((oneDay, idx) => {
          if (idx < 5) {
            return (
              <AccordionItem key={ idx }>
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
                  { this.props.userId ?
                    <div className="row">
                      <div className="col-sm-6">
                        <textarea
                          className= "form-control"
                          ref      = "notes"
                          rows     = "3"
                          onChange = { this.onNotesInputChange }
                          />
                        <button onClick={ this.addCalendarEntry } className="btn btn-primary"> + </button>
                      </div>
                    </div>
                    :
                    null
                  }
                </AccordionItemBody>
              </AccordionItem>
             )
           }
            })
          }
        </Accordion>
    )
  }
}

export default WeatherAccordion
