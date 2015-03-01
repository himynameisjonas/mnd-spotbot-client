import React from 'react';
import SearchActions from './actions/search_actions';

var Search = React.createClass({
  getInitialState() {
    return {
      query: ''
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    SearchActions.search(this.state.query);
    this.setState({ query: '' });
  },

  handleChange(event) {
    this.setState({ query: event.target.value });
  },

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input onChange={this.handleChange} value={this.state.query} type="search" className="form-control" placeholder="Search" />
        </div>
        <button type="submit" className="btn btn-primary">Go</button>
      </form>
    );
  }
});

export default Search;
