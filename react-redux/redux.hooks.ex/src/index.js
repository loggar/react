import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";

function count(state = { c: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        c: state.c + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        c: state.c - 1,
      };
    default:
      return {
        ...state,
      };
  }
}

const store = createStore(count);
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
