import React, { Component } from "react";
import Calendar from "react-calendar";
import Alerts from "../components/Alerts.js";
import AircraftInfo from "../components/AircraftInfo.js";
import DropdownMenu from "../components/DropdownMenu.js";

class Aircrafts extends Component {
  constructor() {
    super();
    this.state = {
      aircraftId: 0,
      locationId: 0,
      airportName: "",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      availableDateRange: [],
      selectedMonth: null,
      selectedDate: null,
      showCalendar: false,
      alerts: "",
      alertStyle: "",
      aircraftSelectionMade: false,
      aircrafts: [{id: 1, name: "A380"}, {id: 2, name: "A350"}, {id: 3, name: "B747"}, {id: 4, name: "B777"}],
      aircraftSchedule: [],
    }
    this.handleAircraftSelection = this.handleAircraftSelection.bind(this);
    this.handleMonthSelection = this.handleMonthSelection.bind(this);
    this.generateCalendarDateRange = this.generateCalendarDateRange.bind(this);
    this.formatCalendarActiveStartDate = this.formatCalendarActiveStartDate.bind(this);
  }

  componentDidMount() {
    let locationId = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}.json`)
    .then((res) => {
      return res.json();
    }).then((location) => {
      this.setState({
        airportName: location.airport_name,
        locationId: locationId,
        availableDateRange: this.generateCalendarDateRange(),
        selectedMonth: new Date().getMonth(),
       })
    });
  }

  generateCalendarDateRange() {
    // generate all months for the next year for dropdown menu
    let today = new Date();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();
    // still need to check if availableMonthsNextYear is empty:
    let availableMonthsThisYear = this.state.monthNames.slice(thisMonth)
    let availableMonthsNextYear = this.state.monthNames.slice(0, thisMonth)
    // format to object necessary for DropdownMenu component
    let formattedThisYear = this.formatCalendar(availableMonthsThisYear, thisYear);
    let formattedNextYear = this.formatCalendar(availableMonthsNextYear, thisYear + 1)

    return formattedThisYear.concat(formattedNextYear)
  }

  formatCalendar(months, year) {
    let result = months.map(month => {
      // id will be the month's actual index in javascript Date, ex: April => 3
      return { id: this.state.monthNames.indexOf(month), name: `${ month } ${ year }`, year: year }
    })
    return result
  }

  formatCalendarActiveStartDate() {
      let month = this.state.selectedMonth
      let year  = this.state.availableDateRange.find(mnth => mnth.id === month).year;
      let date  = new Date(year, month, 1)
      return date
  }

  formatCalendarMaxDate() {
      let lastAvailableMonth = this.state.availableDateRange[11] // there are always 12 objects in this array
      let month = lastAvailableMonth.id
      let year = lastAvailableMonth.year
      let date =  new Date(year, month, 1)
      return date
  }

  handleAircraftSelection(e) {
      this.setState({
        aircraftId: e.target.value,
        aircraftSelectionMade: true,
      });
  }

  handleMonthSelection(e) {
    this.setState({
      // e.target.value comes through as string, convert to int!
      selectedMonth: parseInt(e.target.value),
      showCalendar: true,
    })
  }

  render() {
    return (
      <div className="container">
        { this.state.alerts ? <Alerts alert={ this.state.alerts } style={ this.state.alertStyle } /> : null }
        <div className="row justify-content-center background">
          <h3>Selected airport: { this.state.airportName }</h3>
              <div className="col-sm-12 col-md-8">
                <div className="row">
                  <div className="col-md-6">
                    <h3>Select aircraft:</h3>
                    <DropdownMenu
                      onchange={ this.handleAircraftSelection }
                      dataArray={ this.state.aircrafts }
                      defaultValue="Select date"
                    />

                    </div>
                    <div className="col-md-6">
                      <h3>Select date:</h3>
                      <DropdownMenu
                        onchange={ this.handleMonthSelection }
                        dataArray={ this.state.availableDateRange }
                        defaultValue="Select aircraft"
                      />
                      { this.state.showCalendar ?
                        <Calendar
                          calendarType="US"
                          activeStartDate={ this.formatCalendarActiveStartDate() }
                          maxDate={ this.formatCalendarMaxDate() }
                          minDate={ new Date() }
                          onChange={this.handleDateSelection}
                          value={this.state.selectedDate}
                        />
                        :
                        null
                      }
                    </div>
                  </div>
                <div className="row">
                  { this.state.aircraftSelectionMade ? <p>Selection made for { this.state.aircraftId }</p> : null }
                </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Aircrafts
