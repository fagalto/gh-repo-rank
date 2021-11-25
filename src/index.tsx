import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import View from "./App";
import reportWebVitals from "./reportWebVitals";




import { Provider } from "react-redux";
import store from "./Store/store";

ReactDOM.render(
  <Provider store={store}>
    <View />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
