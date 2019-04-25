import React, { Component } from "react";

class DropdownMenu extends Component {

  render() {
    return(
      <select onChange={ this.props.onchange } className="form-control form-control-lg">
        <option defaultValue disabled>{ this.props.defaultValue }</option>
        { this.props.dataArray.map((item, idx) => {
          return(
            <option value={item.id} key={idx}>{item.name}</option>
            )
          })
        }
      </select>
    )
  }
}

export default DropdownMenu;
