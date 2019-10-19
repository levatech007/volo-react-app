import React, { Component } from "react";
import "./tab-content-box.css";

class TabContentBox extends Component {
  constructor() {
    super()
    this.state = {
      showAttribution: false,
    }
  }

  render() {
    return(
      <div className="row justify-content-center tab-box">
        <div className="tab-box-content">
          <div className="tab-image">
            <img src={ require(`../../images/${ this.props.type }-images/${ this.props.content.name }.jpg`) }
            alt={ this.props.content.title }/>
            { this.props.attribution &&
            <div className="attribution">By&nbsp;
              <a rel="nofollow" href="https://www.flickr.com/people/93755244@N00">Håkan Dahlström
              </a> - originally posted to&nbsp;
              <a href="//commons.wikimedia.org/wiki/Flickr" title="Flickr">Flickr&nbsp;</a>
               as&nbsp;
               <a rel="nofollow" href="https://www.flickr.com/photos/93755244@N00/4142552587">
               SFO international terminal&nbsp;</a>
               <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0&nbsp;</a>
               <a href="https://commons.wikimedia.org/w/index.php?curid=10615771">Link</a>
             </div>
           }
            </div>
            <div className="content-title">
              <h1>{ this.props.content.title }</h1>
            </div>
            <div className="content">
              <p>{ this.props.content.description }</p>
            </div>
        </div>
      </div>
    )
  }
}

export default TabContentBox
