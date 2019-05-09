import React, { Component } from "react";
import AircraftInfo         from "../components/AircraftInfo.js";
import Dropdown             from "../components/Dropdown/Dropdown.js";
import FlightDisplayTable   from "../components/FlightDisplayTable.js";
import SampleFlightSchedule from "../static-data/schedule-for-testing.json";
import Alert                from "../components/Alert/Alert.js";

class FlightsByAircraft extends Component {
  constructor() {
    super();
    this.state = {
                    aircraftId:          0,
                    locationId:          0,
                    airportName:         "",
                    airportIataCode:     "",
                    selectedDateId:      0,
                    dateRange:           [],
                    dayNames:            ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    monthNames:          ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    aircraftTypes:       [{id: 1, name: "A380"}, {id: 2, name: "B787"}, {id: 3, name: "B747"}, {id: 4, name: "B777"}],
                    aircraftSchedule:    [],
                    showFlightSchedule:  false,
                    showAlert:           false,
                    alertMessages:       "",
                    alertStyle:          "",
                  }
    this.handleAircraftSelection    = this.handleAircraftSelection.bind(this);
    this.handleDateSelection        = this.handleDateSelection.bind(this);
    this.generateAvailableDateRange = this.generateAvailableDateRange.bind(this);
    this.formatDateForDropdown      = this.formatDateForDropdown.bind(this);
  }

  componentDidMount() {
    let locationId = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}.json`)
    .then((res) => {
      return res.json()
    }).then((location) => {
      this.setState({
                      airportName:      location.airport_name,
                      airportIataCode:  location.airport,
                      locationId:       locationId,
                      dateRange:        this.generateAvailableDateRange(),
                      aircraftSchedule: SampleFlightSchedule.sampleFlights
                    })
                  })
  }

  handleAircraftSelection(e) {
    console.log(e.target.value)
    this.setState({
                    aircraftId: parseInt(e.target.value), // e.target.value returns a sting, aircraftId must be Integer!
                  })
  }

  handleDateSelection(e) {
    console.log(e.target.value)
    this.setState({
                    selectedDateId: parseInt(e.target.value),
                  })
  }

  generateAvailableDateRange() {
    // should return an array of objects with 'id': int and 'name': strings
    // for today + 6 days in format "Weekday, Month 00, 0000")
    // available date range is currently 7 days
    let availableDaysCount = 7
    let dateArray = [...new Array(availableDaysCount)]
    let dateRange = dateArray.map((_, idx) => {
      var day = new Date()
      var dayUnix = day.setDate(day.getDate() + idx)
      var formattedDate = this.formatDateForDropdown(dayUnix)
      var result =  {
                      id: idx + 1,
                      date: dayUnix,
                      name: formattedDate
                    }
      return result
    })
    return dateRange
  }

  formatDateForDropdown(unixDate) {
    // unix timestamp to format:  "Weekday, Month 00, 0000"
    var fullDate = new Date(unixDate)
    let day   = this.state.dayNames[fullDate.getDay()]
    let date  = fullDate.getDate()
    let month = this.state.monthNames[fullDate.getMonth()]
    let year  = fullDate.getFullYear()
    let formattedDate = `${ day }, ${ month } ${ date }th, ${ year }`
    return formattedDate
  }

  render() {
    console.log(this.state.dateRange)
    return(
      <div className="container">
        { this.state.alerts ? <Alert alert={ this.state.alertMessages } alertStyle={ this.state.alertStyle } /> : null }
        <div className="row justify-content-center background">
              <div className="col-sm-12 col-md-10">
                <h3>Airport: { this.state.airportName }</h3>
                <div className="row">
                  <div className="col-lg-6">
                    <h3>Select aircraft:</h3>
                    <Dropdown
                      onchange={ this.handleAircraftSelection }
                      dataArray={ this.state.aircraftTypes }
                      defaultValue="Select aircraft"
                    />
                    </div>
                    <div className="col-lg-6">
                      <h3>Select date:</h3>
                      <Dropdown
                        onchange={ this.handleDateSelection }
                        dataArray={ this.state.dateRange }
                        defaultValue="Select date:"
                      />
                      </div>

                  </div>
                <div className="row justify-content-center">
                  {
                    this.state.displayFlightSchedule ?
                    <FlightDisplayTable
                      aircraftSchedule={ this.state.aircraftSchedule.filter(schedule => schedule.aircraft === this.state.aircraftId) }
                    />
                    :
                    null
                  }
                </div>
            </div>
          </div>
        </div>
    )
  }
}

export default FlightsByAircraft
