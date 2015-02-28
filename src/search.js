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
    var query = this.refs.$input.getDOMNode().value;
    SearchActions.search(query);
    this.setState({ query: query });
  },

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input ref="$input" type="search" className="form-control" placeholder="Search" />
        </div>
        <button type="submit" className="btn btn-primary">Go</button>
      </form>
    );
  }
});

export default Search;
