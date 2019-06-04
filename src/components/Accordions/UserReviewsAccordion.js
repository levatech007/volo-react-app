import React, { Component } from "react";
import ArrowDn              from "./Images/arrow-dn.svg";
import ArrowUp              from "./Images/arrow-up.svg";
import ReactStars           from "react-stars";
import {
          Accordion,
          AccordionItem,
          AccordionItemTitle,
          AccordionItemBody,
        }                   from "react-accessible-accordion";
import "react-accessible-accordion/dist/minimal-example.css";

class ReviewsAccordion extends Component {
  constructor() {
      super();
      this.state = {
        activeAccordionIndex: null,
      }
      this.handleArrowDirectionChange = this.handleArrowDirectionChange.bind(this);
      this.onEditReview               = this.onEditReview.bind(this);
      this.onDeleteReview             = this.onDeleteReview.bind(this);
  }

  handleArrowDirectionChange(idx) {
    let activeIndex = idx === this.state.activeAccordionIndex ? null : idx
    this.setState({
      activeAccordionIndex: activeIndex,
    })
  }

  onEditReview() {
    console.log("Edit review")
  }

  onDeleteReview() {
    console.log("Delete review")
  }

  render() {
    return(
      <div>
        <Accordion>
          {this.props.reviews.map((oneReview, idx) => {
              return(<AccordionItem key={ idx }>
                      <AccordionItemTitle>
                        <div onClick={ () => this.handleArrowDirectionChange(idx) }>
                          <div className="row" >
                            <div className="col-5">
                              <h4>{ oneReview.title }</h4>
                            </div>
                            <div className="col-5">
                              <ReactStars count={5} value={ parseFloat(oneReview.rating) } edit={ false } size={24} color2={"#ffd700"} />
                            </div>
                            <div className="col-2">
                              <img
                                src={ idx === this.state.activeAccordionIndex ? ArrowUp : ArrowDn }
                                className="down-arrow"
                                alt="down-arrow"
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                        <p>{ oneReview.content }</p>
                        <button className="icon-btn" onClick={ this.onDeleteReview }>
                          <i className="far fa-trash-alt"></i>
                        </button>
                        <button className="icon-btn" onClick={ this.onEditReview }>
                          <i className="far fa-edit"></i>
                        </button>
                      </AccordionItemBody>
                    </AccordionItem>)
                })
              }
            </Accordion>
      </div>
    )
  }
}

export default ReviewsAccordion
