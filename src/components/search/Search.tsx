import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import './Search.css';

interface IState {
  searchTerm: string;
  filteredValues: string[];
}

interface IProps {
  handleFormSubmit: (
    event: FormEvent<HTMLFormElement>,
    searchTerm: string,
  ) => void;
  searchValues: string[];
  handleError: () => void;
}

export class Search extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      searchTerm: '',
      filteredValues: [],
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value;
    this.setState({
      searchTerm,
      filteredValues: this.props.searchValues.filter((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    });
  };

  handleItemClick = (value: string): void => {
    this.setState({
      searchTerm: value,
      filteredValues: [],
    });
  };

  render(): ReactNode {
    const { handleFormSubmit } = this.props;

    return (
      <div className="md:container md:mx-auto flex justify-center h-full items-center">
        <form
          className="relative"
          onSubmit={(e) => handleFormSubmit(e, this.state.searchTerm)}
        >
          <div
            className={
              this.state.searchTerm && this.state.filteredValues.length > 0
                ? 'search-box-results'
                : 'search-box'
            }
          >
            <div className="row">
              <input
                // className="w-full ml-2 mr-2 py-2 px-4 rounded-md max-370:ml-0 max-370:mr-0 max-370:mt-2 max-370:mb-2"
                className="w-full rounded-md"
                type="text"
                placeholder="Search anything..."
                autoComplete="off"
                onChange={this.handleInputChange}
                value={this.state.searchTerm}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Search
              </button>
            </div>
          </div>
          <div className="result-box drop-shadow">
            {this.state.searchTerm && this.state.filteredValues.length > 0 && (
              <ul>
                {this.state.filteredValues.map((item) => (
                  <li key={item} onClick={() => this.handleItemClick(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    );
  }
}
