import React, { Component } from "react";
import './tabs.css'

class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0,
    }
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {

  }

  handleTabClick(tabIdx) {
    this.setState({
      activeTab: tabIdx
    })
    this.props.handleTabsClick(tabIdx)
  }

  render() {
    // for upto 3 tabs
    return(
      <div className="row justify-content-center">
        {
          this.props.tabs.map((tab, idx) => {
            return(
              <div
                className={ this.state.activeTab === idx ? "col-4 tab tab-active" : "col-4 tab" }
                onClick={ () => this.handleTabClick(idx) }
                key={ idx }
              >
              { tab }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Tabs
