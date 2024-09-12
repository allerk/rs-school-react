import { Component, FormEvent } from 'react';
import '../index.css';
import './Page.css';
import { Search } from './Search.tsx';
import { Result } from './Result.tsx';
import getDataFromApi from './utils/getDataFromApi.ts';
import { IApiResponse } from './interfaces/IApiResponse.ts';

interface IState {
  apiUrl: string;
  results: IApiResponse[];
  searchValues: string[];
  isLoading: boolean;
}

export class Page extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);

    if (!localStorage.getItem('searchValues')) {
      localStorage.setItem('searchValues', JSON.stringify([]));
    }

    this.state = {
      apiUrl: 'https://swapi.dev/api/people/',
      results: [],
      searchValues: JSON.parse(localStorage.getItem('searchValues')!),
      isLoading: false,
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    const results = [];
    for (const searchValue of this.state.searchValues) {
      results.push(await this.fetchResult(searchValue));
    }

    const uniqueResults = new Map(
      results.flat().map((item) => [item.name, item]),
    );

    this.setState({ results: [...uniqueResults.values()], isLoading: false });
  }

  handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
    searchTerm: string,
  ): Promise<void> => {
    event.preventDefault();

    let isNewSearchTerm: boolean = false;

    if (searchTerm && !this.state.searchValues.includes(searchTerm)) {
      localStorage.setItem(
        'searchValues',
        JSON.stringify([...this.state.searchValues, searchTerm]),
      );
      isNewSearchTerm = true;
    }

    this.setState({ isLoading: true });
    const results: IApiResponse[] = await this.fetchResult(searchTerm);

    if (isNewSearchTerm) {
      this.setState({
        results: results,
        searchValues: [...this.state.searchValues, searchTerm],
        isLoading: false,
      });
    } else {
      this.setState({
        results: results,
        isLoading: false,
      });
    }
  };

  fetchResult = async (searchTerm: string): Promise<IApiResponse[]> => {
    return await getDataFromApi(
      searchTerm.length > 0
        ? this.state.apiUrl + '?search=' + searchTerm
        : this.state.apiUrl + '?page=1',
    );
  };

  render() {
    return (
      <>
        <section className="small">
          <Search
            handleFormSubmit={this.handleFormSubmit}
            searchValues={this.state.searchValues}
          ></Search>
        </section>
        <section className="big">
          <Result
            results={this.state.results}
            isLoading={this.state.isLoading}
          ></Result>
        </section>
      </>
    );
  }
}
