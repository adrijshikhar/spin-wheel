import React, { Suspense, lazy } from "react";
import * as OfflinePluginRuntime from "offline-plugin/runtime";

import { render } from "react-dom";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from "./components/error/ErrorBoundary";
import CustomSpinner from "./components/common/CustomSpinner";
import store from "./store";

const App = lazy(() => import("./App"));

OfflinePluginRuntime.install();

const Index = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <ErrorBoundary>
        <Suspense fallback={<CustomSpinner className="fallback-spinner text-primary" />}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
render(
  <Provider store={store}>
    <Router>
      <Index />
    </Router>
  </Provider>,
  document.getElementById("root")
);
