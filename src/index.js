import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./store";

ReactDOM.render(
  <BrowserRouter>
    <StateProvider>
      <App />
    </StateProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
