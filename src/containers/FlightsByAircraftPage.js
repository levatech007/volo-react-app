import React, { Component } from "react";
import Dropdown             from "../components/Dropdown/Dropdown.js";
import FlightDisplayTable   from "../components/FlightDisplayTable/FlightDisplayTable.js";
import SampleFlightSchedule from "../static-data/schedule-for-testing.json";
import SampleAircraftInfo   from "../static-data/aircraft-info.json";
import SampleAirportInfo    from "../static-data/airport-info.json";
import Alert                from "../components/Alert/Alert.js";
import Tabs                 from "../components/Tabs/Tabs.js";
import LoadingSpinner       from "../components/LoadingSpinner/LoadingSpinner.js";
import WeatherBanner        from "../components/Banners/WeatherBanner.js";
import TabContentBox        from "../components/TabContentBox/TabContentBox.js";

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
                    aircraftTypes:       [],
                    aircraftSchedule:    [],
                    totalFlights:        0,
                    showFlightSchedule:  false,
                    showAlert:           false,
                    alertMessages:       [],
                    alertStyle:          "",
                    tabs:                ["Flights", "Aircraft", "Airport"],
                    showLoadingSpinner:  false,
                  }
    this.handleAircraftSelection     = this.handleAircraftSelection.bind(this);
    this.handleDateSelection         = this.handleDateSelection.bind(this);
    this.generateAvailableDateRange  = this.generateAvailableDateRange.bind(this);
    this.formatDateForDropdown       = this.formatDateForDropdown.bind(this);
    this.formatDateForApi            = this.formatDateForApi.bind(this);
    this.getMatchingFlights          = this.getMatchingFlights.bind(this);
    this.renderTabs                  = this.renderTabs.bind(this);
    this.handleTabsClick             = this.handleTabsClick.bind(this);
    this.renderTabContent            = this.renderTabContent.bind(this);
    this.getWeatherForecast          = this.getWeatherForecast.bind(this);
    this.getFlightAndWeatherFromApi  = this.getFlightAndWeatherFromApi.bind(this);
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
                      aircraftSchedule: SampleFlightSchedule.sampleFlights,
                      aircraftTypes:    SampleAircraftInfo.aircrafts,
                      selectedDateId:   1, // give default values to Id-s in case nothing is selected
                      aircraftId:       38,
                      activeTabIndex:   0,
                    })
                  })
  }

  handleAircraftSelection(e) {
    this.setState({
                    aircraftId: parseInt(e.target.value), // e.target.value returns a sting, aircraftId must be Integer!
                    showFlightSchedule: false,
                  })
  }

  handleDateSelection(e) {
    this.setState({
                    selectedDateId: parseInt(e.target.value),
                    showFlightSchedule: false,
                  })
  }

  getMatchingFlights() {
    // handle errors if no flights match search criteria
    // aircraftId is first two numbers of the aircraft IATA code
    let date = this.state.dateRange[this.state.selectedDateId - 1].apiDate
    if(this.state.aircraftId && this.state.selectedDateId) {
      this.setState({ showLoadingSpinner: true })
      fetch(`${process.env.REACT_APP_BACKEND_URL}/nonstopflights/${ this.state.airportIataCode }/${ date }/${ this.state.aircraftId }.json`)
      .then( response => {
          if (!response.ok) {
            // no flights found
            this.setState({
              showAlert:     true,
              alertMessages: ["No flight were found."],
              alertStyle:    "alert-box error",
              showLoadingSpinner: false,
            })
            throw response
          }
          return response.json()  //we only get here if there is no error
        })
      .then ((response) => {
          this.setState({
            aircraftSchedule: response.data,
            showFlightSchedule: true,
            showAlert: true,
            totalFlights: response.total_flights,
            alertStyle: "alert-box error",
            alertMessages: ["This feature is still under development. The information is limited to Star Alliance flights only at the moment."],
            showLoadingSpinner: false,
          })
        })
        .catch( err => {
          console.log("error")
        })

    } else {
      let alertMessages = []
      if (!this.state.aircraftId) {
        alertMessages.push("No aircraft selected")
      }
      if (!this.state.selectedDateId) {
        alertMessages.push("No date selected")
      }
      this.setState({
        showAlert: true,
        alertMessages: alertMessages,
        alertStyle: "alert-box error"
      })
    }
  }

// will replace getMatchingFlights when completed
// 2 fetch requests: aircrafts and selected day's weather for WeatherBanner
  getFlightAndWeatherFromApi() {
    let selectedDate = this.state.dateRange[this.state.selectedDateId - 1].apiDate
    if(this.state.aircraftId && selectedDate) {
      this.setState({ showLoadingSpinner: true })
      Promise.all([
        fetch(""),
        fetch(""),
      ]).then(([flights, weather]) => {
        //setState({})
        console.log("Flights: ", flights)
        console.log("Weather", weather)
      })
    }
  }

  generateAvailableDateRange() {
    // should return an array of objects with 'id': int, date: timestamp, 'name': string for Dropdown and apiDate: "YYYY-MM-DD" for api call
    // for today + 6 days in format "Weekday, Month 00, 0000")
    // available date range is currently 7 days
    let availableDaysCount = 7
    let dateArray = [...new Array(availableDaysCount)]
    let dateRange = dateArray.map((_, idx) => {
      let day = new Date()
      let dayUnix = day.setDate(day.getDate() + idx)
      let formattedDate = this.formatDateForDropdown(dayUnix)
      let formattedApiDate = this.formatDateForApi(dayUnix)
      let result =  {
                      id: idx + 1,
                      date: dayUnix,
                      name: formattedDate,
                      apiDate: formattedApiDate
                    }
      return result
    })
    return dateRange
  }

  formatDateForDropdown(unixDate) {
    // unix timestamp to format to  "Weekday, Month 00, 0000" to display in dropdown menu
    let fullDate  = new Date(unixDate)
    let dayName   = this.state.dayNames[fullDate.getDay()]
    let date      = fullDate.getDate()
    let monthName = this.state.monthNames[fullDate.getMonth()]
    let fullYear  = fullDate.getFullYear()
    let formattedDateForDropdown = `${ dayName }, ${ monthName } ${ date }th, ${ fullYear }` // change for 1st & 2nd
    return formattedDateForDropdown
  }

  formatDateForApi(unixDate) {
    // API expects "YYYY-MM-DD"
    let fullDate    = new Date(unixDate)
    let date        = fullDate.getDate().toString()
    let formatDate  = date.length === 1 ? `0${ date }` : `${ date }`
    let month       = (fullDate.getMonth() + 1).toString()
    let formatMonth = month.length === 1 ? `0${ month }` : `${ month }`
    // month for Api date string: (month + 1) if single digit, add 0 to front
    let formattedDateForApi = `${ fullDate.getFullYear() }-${ formatMonth }-${ formatDate }`
    return formattedDateForApi
  }

  renderTabs() {
    return(
      <Tabs
        handleTabsClick={ this.handleTabsClick }
        tabs={ this.state.tabs }
      />
    )
  }

  handleTabsClick(activeTabIdx) {
    this.setState({
      activeTabIndex: activeTabIdx
    })
  }

  getWeatherForecast(day) {
    // get weather forecast for the selected day
  }

  renderTabContent() {
    if(this.state.activeTabIndex === 0) {
      return(
        <FlightDisplayTable
          aircraftSchedule={ this.state.aircraftSchedule }
          airport={ this.state.airportIataCode }
          totalFlights={ this.state.totalFlights }
        />
      )
    } else {
      let content = this.state.activeTabIndex === 1 ? this.state.aircraftTypes.find(aircraft => aircraft.id === this.state.aircraftId) : SampleAirportInfo[this.state.airportIataCode]
      let type = this.state.activeTabIndex === 1 ? "aircraft" : "airport"
      return(
        <TabContentBox
          content={ content }
          type={ type }
        />
      )
    }
  }

  render() {

    console.log(this.state.dateRange[this.state.selectedDateId])
    return(
      <div className="container">
        { this.state.showLoadingSpinner && <LoadingSpinner /> }
        <div className="row justify-content-center background">
          <div className="col-sm-12 col-md-10 centered-text">
            <h1>{ this.state.airportName }</h1>
            { this.state.showAlert ? <Alert alert={ this.state.alertMessages } alertStyle={ this.state.alertStyle } /> : null }
            <div className="row">
              <div className="col-lg-6 centered-text">
                <h3>Select aircraft:</h3>
                <Dropdown
                  onchange={ this.handleAircraftSelection }
                  dataArray={ this.state.aircraftTypes }
                  defaultValue="Select aircraft:"
                />
                </div>
                <div className="col-lg-6 centered-text">
                  <h3>Select date:</h3>
                  <Dropdown
                    onchange={ this.handleDateSelection }
                    dataArray={ this.state.dateRange }
                    defaultValue="Select date:"
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <button
                  onClick={ this.getMatchingFlights }
                  type="submit"
                  className="footer-btn submit"
                  >
                  Find flights
                </button>
              </div>
              {/* <WeatherBanner /> */}
              { this.state.showFlightSchedule && this.renderTabs() }

              { this.state.showFlightSchedule && this.renderTabContent() }

            </div>
          </div>
        </div>
    )
  }
}

export default FlightsByAircraft
