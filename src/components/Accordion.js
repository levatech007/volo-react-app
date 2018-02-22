import React, { Component } from 'react';
import OneCalendarOption from "../components/OneCalendarOption.js"

class Accordion extends Component {


  render() {
    return (
          <div id="accordion">
            {
              this.props.forecast.map((oneDay, idx) => {
                return(
                  <div className="card" key={idx}>
                    <OneCalendarOption createCalendarEntry={ this.props.createCalendarEntry } oneDay={ oneDay } number={(idx+1)}/>
                  </div>
                )
              })
            }
        </div>
    )
  }
}

export default Accordion;
