import React, { Component } from "react";
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from "react-accessible-accordion";

class Api extends Component {
  constructor() {
    super();
    this.state = {
      documentation: {}
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/documentation`)
        .then((res) => {
          return res.json();
        }).then((json_data) => {
          // console.log(documentation)
          this.setState({ documentation: json_data.documentation })
    })
  }

  render() {
    return(
      <div className="container">
        { this.state.documentation.current_routes &&
          <div className="row justify-content-center background">
            <h3>VOLO API:</h3>
            <p>{ this.state.documentation.intro }</p>
            <p>Base url for this api is { this.state.documentation.base_URL }</p>
            <div className="col-12">
                <Accordion>
                  {
                    this.state.documentation.current_routes.map((route, idx) => {
                      return(
                        <AccordionItem key={ idx }>
                          <AccordionItemTitle>
                            <div className="row">
                              <div className="col-md-4"><h4>{ route.request_type }</h4></div>
                              <div className="col-md-8"><p>{ route.route_url }</p></div>
                            </div>
                          </AccordionItemTitle>
                          <AccordionItemBody>
                            <p>{route.route_description}</p>
                            <h5>Required parameters:</h5>
                            <table>
                              <tr>
                                <th>Parameter</th>
                                <th>Type</th>
                                <th>Description</th>
                              </tr>
                              {
                                route.required_params.map((param, idx) => {
                                  return (
                                    <tr>
                                      <td>{ param.param }</td>
                                      <td>{ param.type }</td>
                                      <td>{ param.message }</td>
                                    </tr>
                                  )
                                })
                              }
                            </table>
                            <br></br>
                            <p>{ route.notes }</p>
                          </AccordionItemBody>
                        </AccordionItem>
                      )
                    })
                  }
                </Accordion>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Api
