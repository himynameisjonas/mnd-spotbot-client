import React from 'react';
import Actions from './actions';
import SearchStore from './search_store';

//Ember.$.get("https://api.spotify.com/v1/search",{q: model.query, limit: 20, type: 'album', market: 'se'}).then(function(data){
var Search = React.createClass({
  getInitialState() {
    return {
      query: ''
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    var query = this.refs.$input.getDOMNode().value;
    Actions.search(query);
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
