import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import './Search.css';

interface IState {
  searchTerm: string;
  filteredValues: string[];
  error: boolean;
}

interface IProps {
  handleFormSubmit: (
    event: FormEvent<HTMLFormElement>,
    searchTerm: string,
  ) => void;
  searchValues: string[];
}

export class Search extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      searchTerm: '',
      filteredValues: [],
      error: false,
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
      filteredValues: [], // Hide the dropdown after selecting
    });
  };

  callError = (): void => {
    this.setState({ error: true });
  };

  render(): ReactNode {
    if (this.state.error) {
      throw new Error('I crashed!');
    }
    return (
      <>
        <div className="search-container">
          <button onClick={this.callError}>Call error</button>
          <form
            onSubmit={(e) =>
              this.props.handleFormSubmit(e, this.state.searchTerm)
            }
          >
            <div className="search-box">
              <div className="row">
                <input
                  type="text"
                  id="input-box"
                  placeholder="Search anything..."
                  autoComplete="off"
                  onChange={this.handleInputChange}
                  value={this.state.searchTerm}
                />
                <button>Search</button>
              </div>
              <div className="result-box">
                {this.state.searchTerm &&
                  this.state.filteredValues.length > 0 && (
                    <ul>
                      {this.state.filteredValues.map((item) => (
                        <li
                          key={item}
                          onClick={() => this.handleItemClick(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
