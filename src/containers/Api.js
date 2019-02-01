import React, { Component } from "react";

class Api extends Component {
  constructor() {
    super();
    this.state = {
      documentation: []
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/documentation`)
        .then((res) => {
          return res.json();
        }).then((docs) => {
          console.log(docs)
        //   this.setState({ locations: locations })
    });
  }

  render() {
    return(
      <div>API Documentation here:</div>
    )
  }
}

export default Api
