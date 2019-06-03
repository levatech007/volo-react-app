import React, { Component } from "react";
import ArrowDn              from "./Images/arrow-dn.svg";
import ArrowUp              from "./Images/arrow-up.svg";
import {
          Accordion,
          AccordionItem,
          AccordionItemTitle,
          AccordionItemBody,
        }                   from "react-accessible-accordion";
import "react-accessible-accordion/dist/minimal-example.css";
import "./accordion.css";

class CalendarAccordion extends Component {
  constructor() {
      super();
      this.state = {
        activeAccordionIndex: null,
      }
      this.handleArrowDirectionChange = this.handleArrowDirectionChange.bind(this);
  }

  handleArrowDirectionChange(idx) {
    let activeIndex = idx === this.state.activeAccordionIndex ? null : idx
    this.setState({
      activeAccordionIndex: activeIndex,
    })
  }

  // editReview() {}

  // deleteReview() {}
  render() {
    return(
      <Accordion>
        {this.props.calendarEvents.map((oneEntry, idx) => {
            return(<AccordionItem key={ idx }>
                    <AccordionItemTitle >
                      <div className="item-title" onClick={ () => this.handleArrowDirectionChange(idx) }>
                      <h4>{ oneEntry.weekday }, { oneEntry.day } { oneEntry.month } @ { oneEntry.location }</h4>
                      <img
                        src={ idx === this.state.activeAccordionIndex ? ArrowUp : ArrowDn }
                        className="down-arrow"
                        alt="down-arrow"
                      />
                    </div>
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
