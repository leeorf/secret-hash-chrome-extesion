import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};
type ErrorBoundaryState = {
  error: Error | null;
  errorInfo: any;
};

type ErrorViewProps = {
  error: Error | null;
  errorInfo: any;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Maybe log the error somewhere else it's a good idea, for example:
    // logErrorToMyService(error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      // You can render any custom fallback UI
      return <ErrorView error={error} errorInfo={errorInfo} />;
    }

    return this.props.children;
  }
}

const ErrorView: React.FC<ErrorViewProps> = ({ error, errorInfo }) => (
  <div>
    <h2>Something went wront.</h2>
    <details>{error && error.toString()}</details>
    <br />
    {errorInfo.componentStack}
  </div>
);
