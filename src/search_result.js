import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import PlayerActions from './actions/player_actions';
import SearchStore from './stores/search_store';

var Album = React.createClass({
  handleClick() {
    PlayerActions.setPlaylist(this.props.item.uri);
  },
  render() {
    var album = this.props.item;
    return (
      <li onClick={this.handleClick}>
        <div className="media">
            <div className="media-left">
              <img src={album.images[2].url} />
            </div>
            <div className="media-body">
              <h4 className="media-heading">
                {album.name}
              </h4>
            </div>
        </div>
      </li>
    );
  }
});

var List = React.createClass({
  render() {
    var _list = this.props.result.map(item => {
      return <Album item={item} />;
    });
    return (
      <div>
        <h2>Search result: albums</h2>
        <ul>
          {_list}
        </ul>
      </div>
    );
  }
});

var SearchResult = React.createClass({
  mixins: [Reflux.listenTo(SearchStore, 'onSearchChange')],
  getInitialState() {
    return {
      result: null
    };
  },
  onSearchChange(result) {
    this.setState({ result: result });
  },
  render() {
    var _list = '';
    if(this.state.result !== null) {
      _list = <List result={this.state.result} />;
    }
    return (
      <div>
      {_list}
      </div>
    );
  }
});

export default SearchResult;
