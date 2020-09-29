import React from "react";
import App from "./App";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import * as OfflinePluginRuntime from "offline-plugin/runtime";
OfflinePluginRuntime.install();

render(
  <Router>
    <Route component={App} />
  </Router>,
  document.getElementById("root")
);
