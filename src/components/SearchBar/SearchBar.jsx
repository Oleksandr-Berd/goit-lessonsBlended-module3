import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = evt => {
    const query = evt.target.value;
    this.setState({ query });
  };

  handleSubmit = evt => {
    const { query } = this.state;
    const { onSubmit } = this.props;
    evt.preventDefault();
    onSubmit(query);
  };

  render() {
    const { query } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <header>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
