import React from "react";
import ErrorView from "./Errorview"

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any) {
    console.error(err);
  }
  render() {
    if (this.state.hasError)
      return <ErrorView message="Unexpected error occurred." />;
    return this.props.children;
  }
}
