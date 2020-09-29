import React from "react";
import App from "./App";
import "./styles/main.scss";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
OfflinePluginRuntime.install();

render(
  <Router>
    <Route component={App} />
  </Router>,
  document.getElementById("root")
);
