import { Component, ReactNode } from 'react';
import { CharacterInfo } from '../../interfaces/IApiResponse.ts';
import './Results.css';

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
      <div>
        {!noResults ? (
          <ul>
            {results.map((item) => (
              <li key={item.name}>
                The character - <span className="bold-text">{item.name}</span>{' '}
                is <span className="red-text">{item.height}</span> height and it
                weighs around <span className="red-text">{item.mass}</span> kgs.{' '}
                <span className="bold-text">{item.name}</span> identifies as a{' '}
                <span className="red-text">{item.gender}</span> person and has a{' '}
                <span className="red-text">{item.eye_color}</span> eyes.
              </li>
            ))}
          </ul>
        ) : (
          <p>Nothing was found. Try again!</p>
        )}
      </div>
    );
  }
}
