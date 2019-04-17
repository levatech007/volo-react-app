import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import Auth from "j-toker";
import MyRoutes from "./config/routes.js"
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userSignedIn: false,
      userName: "",
      userId: null,
    }
  }

  componentWillMount() {
    Auth.validateToken()
    .then((user) => {
      this.setState({
        userSignedIn: user.signedIn,
        userName: user.name,
        userId: user.id,
      })
    })
  }



  render() {
    return (
      <div className="home-screen">
        <div className="gradient">
        <LoadingSpinner />
        <Header />
        { MyRoutes }
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
