import React from 'react';
import _ from 'lodash';
import utils from './utils';
import QueueActions from './actions/queue_actions';
import PlayerActions from './actions/player_actions';
import CurrentTrackActions from './actions/current_track_actions';
import AddPlaylist from './current_playlist/add_playlist';

var Track = React.createClass({
  handleClick() {
    CurrentTrackActions.setTrack(this.props.metaData);
  },
  render() {
    var track = this.props.metaData;
    return (
      <div className="media track">
        <div className="media-left" onClick={this.handleClick}>
          <img src={track.album.images[2].url} />
        </div>
        <div className="media-body">
          <h3 className="media-heading">
            {track.name} <span className="time">{utils.formatDuration(track.duration_ms)}</span>
          </h3>
          <div>
            {track.artists[0].name} / {track.album.name}
          </div>
        </div>
      </div>
    );
  }
});

var AlbumTrack = React.createClass({
  handleClick() {
    CurrentTrackActions.setTrack(this.props.metaData);
  },
  render() {
    var track = this.props.metaData;
    return (
      <div>
        <div className="media track">
          <h3 className="media-heading" onClick={this.handleClick}>
            <span className="track-name">{this.props.index}. {track.name}</span> <span className="time">{utils.formatDuration(track.duration_ms)}</span>
          </h3>
        </div>
      </div>
    );
  }
});

var CurrentPlaylist = React.createClass({

  getInitialState() {
    return {
      isAlbum: false
    }
  },

  componentWillReceiveProps(newProps) {
    var albums = newProps.tracks.map(track => {
      return track.album.uri;
    });
    var isAlbum = _.uniq(albums).length === 1;
    this.setState({ isAlbum: isAlbum });
  },

  renderPlayList() {
    var _tracks = [];
    this.props.tracks.map((track, index) => {
      if(this.state.isAlbum) {
        _tracks.push(<li key={index}><AlbumTrack index={index+1} key={index} metaData={track} /></li>);
      }
      else {
        _tracks.push(<li key={index}><Track index={index+1} key={index} metaData={track} /></li>);
      }
    });
    return (
      <ol className="list-unstyled">
      {_tracks}
      </ol>
    );
  },

  render() {
    var playList = '';
    if(!_.isEmpty(this.props.tracks)) {
      playList = this.renderPlayList();
    }
    var albumCover = '';
    if(this.state.isAlbum) {
      albumCover = <img src={this.props.tracks[0].album.images[2].url} />
    }

    return (
      <div className="playlist">
        <h3>Playlist/Album {albumCover} <span className="playlist-name">{this.props.name}</span></h3>
        <AddPlaylist />
        {playList}
      </div>
    );
  }
});

export default CurrentPlaylist;
