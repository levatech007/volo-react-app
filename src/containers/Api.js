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
      <div className="container">
        <div className="row justify-content-center background">
          <h3>VOLO API:</h3>
          <div className="col-12">
            
          </div>
        </div>
      </div>
    )
  }
}

export default Api
