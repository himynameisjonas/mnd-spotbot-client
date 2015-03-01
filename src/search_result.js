import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import utils from './utils';
import PlaylistActions from './actions/playlist_actions';
import SearchActions from './actions/search_actions';
import QueueActions from './actions/queue_actions';
import { Button } from 'react-bootstrap';

var Image = React.createClass({
  render() {
    return (
      <div className="media-left" onClick={this.props.handleClick}>
        <img src={this.props.imageUrl} />
        <div className="enqueue">
          <i className="fa fa-plus"></i>
        </div>
      </div>
    );
  }
});

var Album = React.createClass({
  handleClick() {
    PlaylistActions.setPlaylistUri(this.props.item.uri);
    SearchActions.removeAlbum(this.props.item);
  },
  render() {
    var album = this.props.item;
    return (
      <li>
        <div className="media album">
            <Image handleClick={this.handleClick} imageUrl={album.images[2].url} />
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
    SearchActions.removeTrack(this.props.item);
  },
  render() {
    var track = this.props.item;
    return (
      <li>
        <div className="media album">
            <Image handleClick={this.handleClick} imageUrl={track.album.images[2].url} />
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
        <ul className="list-unstyled">
          {_tracks}
        </ul>
      </div>
    );
  }
});

var SearchResult = React.createClass({
  render() {
    var _albumList = 'No result',
        _trackList = 'No result';
    if(!_.isEmpty(this.props.albums)) {
      _albumList = <AlbumList albums={this.props.albums} />;
    }
    if(!_.isEmpty(this.props.tracks)) {
      _trackList = <TrackList tracks={this.props.tracks} />;
    }
    var hasResult = false;
    if(!_.isEmpty(this.props.albums) || !_.isEmpty(this.props.tracks)) {
      hasResult = true;
    }
    var style = {
      display: ((hasResult) ? 'block' : 'none')
    };
    return (
      <div className="container" style={style}>
        <h2>Search result <Button bsStyle="link" onClick={SearchActions.clearSearch}>Clear</Button></h2>
        <div className="row">
          <div className="col-xs-6">
            <h3>Tracks:</h3>
            {_trackList}
          </div>
          <div className="col-xs-6">
            <h3>Albums:</h3>
            {_albumList}
          </div>
        </div>
      </div>
    );
  }
});

export default SearchResult;
