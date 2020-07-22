import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import "typeface-roboto";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider } from "material-ui/styles";

import App from "./components/App.js";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
