import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CrashError } from '../../components/common/Icons';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Updates state so the next render will show the fallback UI.
    if (error) {
      return { hasError: true };
    }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // custom fallback UI
      return (
        <div className="error-container">
          <CrashError className="error-boundary-icon" />
          <div>Something just went wrong!</div>
          <div className="fw-bold">
            The page you are looking for didn’t load. We willl fix it soon!
          </div>
          <div className="fw-bold text-primary">Try Reloading the Page</div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};

export default ErrorBoundary;
