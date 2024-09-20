import { Component, ReactNode } from 'react';
import { IApiResponse } from '../../interfaces/IApiResponse.ts';
import './Result.css';

interface IProps {
  results: IApiResponse[];
  isLoading: boolean;
}

export class Result extends Component<IProps> {
  render(): ReactNode {
    return (
      <>
        <div>
          {this.props.results.length > 0 && !this.props.isLoading ? (
            <ul>
              {this.props.results.map((item) => (
                <li key={item.name}>
                  The character - <span className="bold-text">{item.name}</span>{' '}
                  is <span className="red-text">{item.height}</span> height and
                  it weighs around <span className="red-text">{item.mass}</span>{' '}
                  kgs. <span className="bold-text">{item.name}</span> identifies
                  as a <span className="red-text">{item.gender}</span> person
                  and has a <span className="red-text">{item.eye_color}</span>{' '}
                  eyes.
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </>
    );
  }
}
