import React, { Component } from "react";

class FlightDisplayTable extends Component {

  render() {
    return(
      <table>
        <tbody>
          {
            this.props.aircraftSchedule.map((item, idx) => {
              let icon = item.type.toLowerCase()
              return (
                <tr key={ idx }>
                  <td><img src={ require(`../images/table-icons/${ icon }-icon.svg`) }/></td>
                  <td>{ item.route }</td>
                  <td>{ item.time }</td>
                  <td>{ item.airline }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

}

export default FlightDisplayTable;
