import React, { Suspense, lazy } from "react";

import { render } from "react-dom";
import { Provider } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./components/error/ErrorBoundary";
import CustomSpinner from "./components/common/CustomSpinner";
import store from "./store";

const Home = lazy(() => import("./views/home"));
const Game = lazy(() => import("./views/game"));

const Index = () => {
  return (
    <div className="app">
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
        <Suspense
          fallback={<CustomSpinner className="fallback-spinner text-primary" />}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route  path="/game" component={Game} />
            <Redirect to="/" />
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
