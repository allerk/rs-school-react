import { Component, ReactNode } from 'react';
import { CharacterInfo } from '../../interfaces/IApiResponse.ts';
import './Results.css';
import { CardsList } from '../../common/card/CardsList.tsx';

interface IProps {
  results: CharacterInfo[];
  isStart: boolean;
  noResults: boolean;
}

export class Results extends Component<IProps> {
  render(): ReactNode {
    const { results, isStart, noResults } = this.props;
    if (isStart) {
      return <p>Try to find something!</p>;
    }

    return (
      <div className="md:container md:mx-auto pt-10">
        {!noResults ? (
          <CardsList results={results}></CardsList>
        ) : (
          <p>Nothing was found. Try again!</p>
        )}
      </div>
    );
  }
}
