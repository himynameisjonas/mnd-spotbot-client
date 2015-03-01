import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import PlaylistActions from './actions/playlist_actions';

var Album = React.createClass({
  handleClick() {
    PlaylistActions.setPlaylistUri(this.props.item.uri);
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
  render() {
    var _list = '';
    if(!_.isEmpty(this.props.searchResult)) {
      _list = <List result={this.props.searchResult} />;
    }
    return (
      <div>
      {_list}
      </div>
    );
  }
});

export default SearchResult;
