import React, { Component } from "react";

class Errors extends Component {

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="alert alert-danger" role="alert">{this.props.errors}</div>
        </div>
      </div>
    )
  }
}

export default Errors;
