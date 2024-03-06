import React, { Component } from "react";
import ErrorComponent from "./ErrorComponent/ErrorComponent";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.error(`Unable to load`);
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
