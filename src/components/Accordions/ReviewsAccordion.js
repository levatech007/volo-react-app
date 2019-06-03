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
  }

  handleArrowDirectionChange(idx) {
    let activeIndex = idx === this.state.activeAccordionIndex ? null : idx
    this.setState({
      activeAccordionIndex: activeIndex,
    })
  }

  // editReview() {}

  // deleteReview() {}

  render() {
    return(
      <div>
        <Accordion>
          {this.props.reviews.map((oneReview, idx) => {
              return(<AccordionItem key={ idx }>
                      <AccordionItemTitle>
                        <div onClick={ () => this.handleArrowDirectionChange(idx) }>
                          <div className="row" >
                            <div className="col-9">
                              <h4>{ oneReview.title }</h4><p>by {oneReview.author}</p>
                            </div>
                            <div className="col-3">
                              <ReactStars count={5} value={ parseFloat(oneReview.rating) } edit={ false } size={24} color2={"#ffd700"} />
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <img
                              src={ idx === this.state.activeAccordionIndex ? ArrowUp : ArrowDn }
                              className="down-arrow"
                              alt="down-arrow"
                            />
                          </div>
                        </div>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                        <p>{ oneReview.content }</p>
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
