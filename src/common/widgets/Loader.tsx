import { Component, ReactNode } from 'react';

interface IProps {
  isLoading: boolean;
  children: ReactNode;
}

export class Loader extends Component<IProps, unknown> {
  render() {
    const { isLoading, children } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return children;
  }
}
