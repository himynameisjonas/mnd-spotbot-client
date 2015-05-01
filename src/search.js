import React from 'react';
import SearchActions from './actions/search_actions';
import _ from 'lodash';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };

    this.bounceSearch = _.debounce((e) => {
      SearchActions.search(this.state.query);
    }, 400);
  }

  handleSubmit(event) {
    event.preventDefault();
    SearchActions.search(this.state.query);
  }

  handleInput(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit.bind(this)}>
        <div className="has-feedback">
          <input onInput={this.handleInput.bind(this)} onChange={this.bounceSearch.bind(this)} value={this.state.query} type="search" className="form-control" placeholder="Search..." />
          <i className="fa fa-search form-control-feedback"></i>
        </div>
      </form>
    );
  }
};

export default Search;
