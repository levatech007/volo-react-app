import React, { Component } from "react";
import "./App.css";
import Auth from "j-toker";
import MyRoutes from "./config/routes.js"
import Header from "./components/Header.js";

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

  onUserLogOut(e) {
    Auth.signOut()
    .then((resp) => {
      this.setState({
        userSignedIn: false,
        userName: "",
        userId: null,
      })
    })
    .fail((resp) => {
      console.log(resp) // give error msg
    });
  }



  render() {
    return (
      <div className="gradient">
        <Header userSignedIn = { this.state.userSignedIn } userName = { this.state.userName } userId = { this.state.userId } userLogout = { this.onUserLogOut }/>
        { MyRoutes }
      </div>
    );
  }
}

export default App;
