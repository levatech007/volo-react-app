import React, { Component } from 'react';

class SelectionButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.click(this.props.name);
  }

  render() {
    return(
      <div className="col-4 center-col-content">
        <button type="button" className="btn btn-light selection-button" onClick={ this.handleClick }>
          <img className="img-fluid" src={ require(`../images/button-icons/${ this.props.name }-icon.svg`) } alt={ `${ this.props.name }-icon` } />
          <p>{ this.props.title }</p>
        </button>
      </div>
    )
  }
}

export default SelectionButton
