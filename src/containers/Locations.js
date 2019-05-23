import React, { Component } from "react";
import LocationMarkerLg     from "../images/location-marker-lg.svg";
import SelectionButton      from "../components/SelectionButton.js";
import Alert                from "../components/Alert/Alert.js";
import LoadingSpinner       from "../components/LoadingSpinner/LoadingSpinner.js";
import Dropdown             from "../components/Dropdown/Dropdown.js";

class Locations extends Component {
  constructor() {
    super();
    this.state = {
                    locations:            [],
                    selectedLocationId:   0,
                    selectedAirportCode:  "",
                    alerts:               "",
                    alertStyle:           "alert-box error",
                    showLoadingSpinner:   false,
                    selectionButtons:     [
                                            {buttonName: "info", buttonTitle: "Info"},
                                            {buttonName: "aircraft", buttonTitle: "Aircrafts"},
                                            {buttonName: "weather", buttonTitle: "Weather"},
                                          ],
                  }
    this.handleLocationChange     = this.handleLocationChange.bind(this);
    this.handleSelectButtonClick  = this.handleSelectButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({ showLoadingSpinner: true })
    fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`)
        .then((res) => {
          return res.json();
        }).then((locations) => {
          this.setState({
                          locations:          locations,
                          selectedLocationId: locations[0].id, // set default location
                          showLoadingSpinner: false
                         })
    });

    window.scrollTo(0, 0)
  }

  handleLocationChange(e) {
    this.setState({
                    locations:            this.state.locations,
                    selectedLocationId:   e.target.value,
                    selectedAirportCode:  e.target.value,
                  });
  }

  handleSelectButtonClick(name) {
    // this should be scaled down
    if(this.state.selectedLocationId){
      if(name === 'info') {
        this.props.history.push(`/locations/${this.state.selectedLocationId}`)
      } else if(name === 'aircraft'){
        this.props.history.push(`/locations/${this.state.selectedLocationId}/aircrafts`)
      } else if(name === 'weather') {
        this.props.history.push(`/weather/${this.state.selectedLocationId}`)
      } else {
        this.setState({ alerts: "There was an error." })
      }
    } else {
      this.setState({ alerts: "Please select a location" })
    }
  }

  render() {
    return (
      <div className="container">
        { this.state.showLoadingSpinner ? <LoadingSpinner /> : null }
        { this.state.alerts ? <Alert alert={ this.state.alerts } alertStyle={ this.state.alertStyle } /> : null }
        <div className="row justify-content-center background">
          <div className="col-12">
            <div className="row justify-content-center">
              <img className="marker-lg" src={ LocationMarkerLg } alt="location-marker"/>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-8 centered-text">
                <h3>Select your spotting location:</h3>
                <Dropdown
                  onchange={ this.handleLocationChange }
                  dataArray={ this.state.locations }
                  defaultValue="Select locations:"
                />
                </div>
              </div>
              <div className="row">
                {
                  this.state.selectionButtons.map((btn, idx) => {
                    return(
                        <SelectionButton click={ this.handleSelectButtonClick } name={ btn.buttonName } title={ btn.buttonTitle } key={ idx } />
                    )
                  })
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Locations;
