import React, { Component } from "react";
import {
          Accordion,
          AccordionItem,
          AccordionItemTitle,
          AccordionItemBody,
        }                   from "react-accessible-accordion";
import "react-accessible-accordion/dist/minimal-example.css";

class CalendarAccordion extends Component {
  render() {
    return(
      <Accordion>
        {this.props.calendarEvents.map((oneEntry, idx) => {
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
      )
    }
  }

  export default CalendarAccordion
