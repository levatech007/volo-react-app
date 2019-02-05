import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import $ from "jquery"
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

$.auth.configure({
  apiUrl: `${process.env.REACT_APP_BACKEND_URL}`,
  passwordResetSuccessUrl: function() {
    return `${process.env.REACT_APP_REDIRECT_URL}/password`;
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"));
registerServiceWorker();
