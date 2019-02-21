import React, { Component } from 'react';
function importAll(r) {
  let images = {}
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item) })
  return images
}

class SelectionButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.click(this.props.name);
  }

  render() {
    const buttonIcons = importAll(require.context('../images/button-icons', false, /\.(png|jpe?g|svg)$/));
    return(
      <div className="col-md-4">
        <button type="button" className="btn btn-light selection-button" onClick={ this.handleClick }>
          <img src={ buttonIcons[`${ this.props.name }-icon.svg`] } alt={ `${ this.props.name }-icon` } />
          <h4>{ this.props.title }</h4>
        </button>
      </div>
    )
  }
}

export default SelectionButton
