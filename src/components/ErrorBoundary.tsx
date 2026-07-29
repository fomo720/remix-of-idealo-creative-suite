import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode | ((reset: () => void) => ReactNode);
};

type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Log full error for debugging via browser console (F12).
    console.error("[ErrorBoundary] Uncaught error:", error, info);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      return typeof fallback === "function" ? fallback(this.reset) : fallback;
    }
    return this.props.children;
  }
}
