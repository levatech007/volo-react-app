import React, { Component } from "react";
import "./flight-display-table.css";

class FlightDisplay extends Component {
  constructor() {
    super();
    this.state = {
      airport: "",
      aircraftSchedule: []
    }
    this.formatFlightForTable = this.formatFlightForTable.bind(this);
    this.sortFlightData       = this.sortFlightData.bind(this);
    this.sortFlightsByTime    = this.sortFlightsByTime.bind(this);
    this.formatTimeToAMPM     = this.formatTimeToAMPM.bind(this);
  }

  componentDidMount() {
    this.setState({
      airport: this.props.airport,
      aircraftSchedule: this.sortFlightData(this.props.aircraftSchedule)
    })
  }

  sortFlightData(schedule) {
    let aircraftSchedule = []
    Object.keys(schedule).forEach((aircraft, flights) => {
       schedule[aircraft].map(flight => {
         aircraftSchedule.push(this.formatFlightForTable(flight.flights))
       })
    })
    let sortedFlights = this.sortFlightsByTime(aircraftSchedule)
    return sortedFlights
  }

  formatFlightForTable(flight) {
    // determine if flight is arrival or departure for selected airport
    let type = flight.departure_airport === this.props.airport ? "departure" : "arrival"
    // select time that the aircraft is seen at the selected airport
    let timeAtAirport = type === "departure" ?  flight.departure_time_local : flight.arrival_time_local
    let formattedFlight =  {
                            flightType: type,
                            timeAtAirport: timeAtAirport,
                            timeToDisplay: this.formatTimeToAMPM(timeAtAirport),
                            aircraftType: flight.aircraft_type,
                            airline: flight.operated_by,
                            route: `${ flight.departure_airport } to ${ flight.arrival_airport }`,
                            flightNumber: flight.flight_number,
                          }
    return formattedFlight
  }

  formatTimeToAMPM(date) {
    // convert time to am/pm for display
    let time = date.split("T")[1]
    let hours = time.split(":")[0]
    let minutes = time.split(":")[1]
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12
    let displayTime = `${ hours }:${ minutes }${ ampm }`
    return displayTime
}

  sortFlightsByTime(flights) {
    let sortedFlights = flights.sort((day1,day2) => {
                          let selectedDay = new Date(day1.timeAtAirport)
                          let nextDay = new Date(day2.timeAtAirport)
                          return nextDay - selectedDay
                        });
    return sortedFlights.reverse()
  }
  render() {
    return(
      <div className="col-12 flight-table">
        {
          this.state.aircraftSchedule.map((flight, idx) => {
            return(
              <div className="row flight-row" key={ idx }>
                <div className="col-2"><img src={ require(`./Images/${ flight.flightType }-icon.svg`) } alt={ flight.type }/></div>
                <div className="col-2">{ flight.timeToDisplay }</div>
                <div className="col-2">{ flight.route }</div>
                <div className="col-3">{ flight.airline }</div>
                <div className="col-3">{ flight.aircraftType }</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default FlightDisplay;
