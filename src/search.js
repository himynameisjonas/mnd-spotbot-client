import React from 'react';
import SearchActions from './actions/search_actions';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    SearchActions.search(this.state.query);
    this.setState({ query: '' });
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit.bind(this)}>
        <div className="has-feedback">
          <input onChange={this.handleChange.bind(this)} value={this.state.query} type="search" className="form-control" placeholder="Search..." />
          <i className="fa fa-search form-control-feedback"></i>
        </div>
      </form>
    );
  }
};

export default Search;
