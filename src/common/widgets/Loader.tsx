import { Component, ReactNode } from 'react';
import './Loader.css';

interface IProps {
  isLoading: boolean;
  children: ReactNode;
}

export class Loader extends Component<IProps, unknown> {
  render() {
    const { isLoading, children } = this.props;
    if (isLoading) {
      return (
        <div className="md:container md:mx-auto flex justify-center h-full items-center">
          <div className="loader"></div>
        </div>
      );
    }

    return children;
  }
}
