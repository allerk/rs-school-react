import { Component, FormEvent } from 'react';
import '../index.css';
import './Page.css';
import { Search } from './search/Search.tsx';
import { Results } from './results/Results.tsx';
import { GetDataFromApi } from '../services/GetDataFromApi.ts';
import {
  GetSearchValuesFromLS,
  SaveSearchTermToLS,
} from '../services/Storage.ts';
import { CharacterInfo } from '../interfaces/IApiResponse.ts';
import { API_URL } from '../constants/general-constants.ts';
import { Loader } from '../common/widgets/Loader.tsx';

interface IState {
  apiUrl: string;
  results: CharacterInfo[];
  searchValues: string[];
  isLoading: boolean;
  isError: boolean;
  isStart: boolean;
  noResults: boolean;
}

export class Page extends Component<unknown, IState> {
  state = {
    apiUrl: API_URL,
    results: [],
    searchValues: GetSearchValuesFromLS(),
    isLoading: false,
    isError: false,
    isStart: true,
    noResults: false,
  };

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    const results = [];
    for (const searchValue of this.state.searchValues) {
      results.push(await this.fetchResults(searchValue));
    }

    const uniqueResults = new Map(
      results.flat().map((item) => [item.name, item]),
    );

    this.setState({
      results: [...uniqueResults.values()],
      isLoading: false,
      isStart: results.length <= 0,
    });
  }

  componentDidUpdate(
    _prevProps: Readonly<unknown>,
    prevState: Readonly<IState>,
  ) {
    if (this.state.searchValues !== prevState.searchValues) {
      const newSearchValues = this.state.searchValues.filter(
        (value) => !prevState.searchValues.includes(value),
      );

      if (newSearchValues.length > 0) {
        SaveSearchTermToLS(JSON.stringify(this.state.searchValues));
      }
    }
  }

  handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
    searchTerm: string,
  ): Promise<void> => {
    event.preventDefault();
    searchTerm = searchTerm.trim();
    const results = await this.fetchResults(searchTerm);
    if (results.length > 0) {
      this.setState({
        results: results,
        searchValues:
          !this.state.searchValues.includes(searchTerm) && searchTerm !== ''
            ? [...this.state.searchValues, searchTerm]
            : this.state.searchValues,
        isLoading: false,
        noResults: false,
        isStart: false,
      });
    } else {
      this.setState({ noResults: true, isStart: false });
    }
  };

  fetchResults = async (searchTerm: string): Promise<CharacterInfo[]> => {
    const response = await GetDataFromApi(
      searchTerm.length > 0
        ? this.state.apiUrl + '?search=' + searchTerm
        : this.state.apiUrl,
    );

    return response.results;
  };

  handleError = (): void => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error('I crashed!');
    }
    return (
      <div className="w-full">
        <section className="small">
          <Search
            handleFormSubmit={this.handleFormSubmit}
            searchValues={this.state.searchValues}
            handleError={this.handleError}
          ></Search>
        </section>
        <section className="big">
          <Loader isLoading={this.state.isLoading}>
            <Results
              results={this.state.results}
              isStart={this.state.isStart}
              noResults={this.state.noResults}
            ></Results>
          </Loader>
        </section>
      </div>
    );
  }
}
