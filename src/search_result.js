import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import utils from './utils';
import PlaylistActions from './actions/playlist_actions';
import SearchActions from './actions/search_actions';
import QueueActions from './actions/queue_actions';

var Album = React.createClass({
  handleClick() {
    PlaylistActions.setPlaylistUri(this.props.item.uri);
    SearchActions.removeAlbum(this.props.item);
  },
  render() {
    var album = this.props.item;
    return (
      <li onClick={this.handleClick}>
        <div className="media album">
            <div className="media-left">
              <img src={album.images[2].url} />
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                {album.name} <span className="release-date">{album.release_date}</span>
              </h3>
              <h4>{album.artists[0].name}</h4>
            </div>
        </div>
      </li>
    );
  }
});

var Track = React.createClass({
  handleClick() {
    QueueActions.enqueue(this.props.item.uri);
    //SearchActions.removeTrack(this.props.item);
  },
  render() {
    var track = this.props.item;
    return (
      <li onClick={this.handleClick}>
        <div className="media album">
            <div className="media-left">
              <img src={track.album.images[2].url} />
            </div>
            <div className="media-body">
              <h3 className="media-heading">
                {track.name} <span className="time">{utils.formatDuration(track.duration_ms)}</span>
              </h3>
              <h4>{track.artists[0].name}</h4>
            </div>
        </div>
      </li>
    );
  }
});

var AlbumList = React.createClass({
  render() {
    var _albums = this.props.albums.map(item => {
      return <Album item={item} />;
    });
    return (
      <div>
        <h2>Albums:</h2>
        <ul className="list-unstyled">
          {_albums}
        </ul>
      </div>
    );
  }
});

var TrackList = React.createClass({
  render() {
    var _tracks = this.props.tracks.map(item => {
      return <Track item={item} />;
    });
    return (
      <div>
        <h2>Tracks:</h2>
        <ul className="list-unstyled">
          {_tracks}
        </ul>
      </div>
    );
  }
});

var SearchResult = React.createClass({
  render() {
    var _albumList = '',
        _trackList = '';
    if(!_.isEmpty(this.props.albums)) {
      _albumList = <AlbumList albums={this.props.albums} />;
    }
    if(!_.isEmpty(this.props.tracks)) {
      _trackList = <TrackList tracks={this.props.tracks} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6">
            {_albumList}
          </div>
          <div className="col-xs-6">
            {_trackList}
          </div>
        </div>
      </div>
    );
  }
});

export default SearchResult;
