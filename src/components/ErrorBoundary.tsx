import { Component, ReactNode } from 'react';

interface IState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{ fontWeight: 'bold' }}>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
