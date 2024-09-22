import { Component } from 'react';
import { Card } from './Card.tsx';
import { CharacterInfo } from '../../interfaces/IApiResponse.ts';
import './CardsList.css';

interface IProps {
  results: CharacterInfo[];
}

export class CardsList extends Component<IProps> {
  render() {
    const { results } = this.props;

    return (
      <ul className="flex justify-center items-stretch flex-wrap">
        {results.map((item) => (
          <Card key={item.name} item={item}></Card>
        ))}
      </ul>
    );
  }
}
