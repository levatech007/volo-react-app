import React, { Component } from 'react';
import Accordion from "../components/Accordion.js"



class Calendars extends Component {
  constructor(){
    super();
  }



  render() {
    return (
      <div className="container">
        <div className="row background">
          <Accordion />
        </div>
      </div>
    )
  }
}

export default Calendars;
