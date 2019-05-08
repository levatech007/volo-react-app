import React, { Component } from "react";
import "./dropdown.css";

class DropdownMenu extends Component {

  render() {
    return(
      <div className="col-12 dropdown">
        <select onChange={ this.props.onchange } className="select">
          <option defaultValue disabled>{ this.props.defaultValue }</option>
          { this.props.dataArray.map((item, idx) => {
            return(
              <option value={item.id} key={idx}>{item.name}</option>
              )
            })
          }
        </select>
      </div>
    )
  }
}

export default DropdownMenu;
