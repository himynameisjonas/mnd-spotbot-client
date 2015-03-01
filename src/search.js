import React from 'react';
import SearchActions from './actions/search_actions';

var Search = React.createClass({
  getInitialState() {
    return {
      query: ''
    };
  },

  handleSubmit(event) {
    event.preventDefault();
    SearchActions.search(this.state.query);
    this.setState({ query: '' });
  },

  handleChange(event) {
    this.setState({ query: event.target.value });
  },

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <div className="has-feedback">
          <input onChange={this.handleChange} value={this.state.query} type="search" className="form-control" placeholder="Search..." />
          <i className="fa fa-search form-control-feedback"></i>
        </div>
      </form>
    );
  }
});

export default Search;
