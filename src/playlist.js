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
    var isCurrentTrack = (this.props.isCurrentTrack) ? 'playlist-current-track' : '';
    return (
      <tr className={isCurrentTrack} onClick={this.handleClick}>
        <td>{this.props.index}.</td>
        <td>{track.name}</td>
        <td className="hidden-xs">{track.artists[0].name}</td>
        <td className="hidden-xs">{track.album.name}</td>
        <td className="track-duration">{utils.formatDuration(track.duration_ms)}</td>
      </tr>
    );
  }
});

var AlbumTrack = React.createClass({
  handleClick() {
    CurrentTrackActions.setTrack(this.props.metaData);
  },
  render() {
    var track = this.props.metaData;
    var isCurrentTrack = (this.props.isCurrentTrack) ? 'playlist-current-track' : '';
    return (
      <tr className={isCurrentTrack} onClick={this.handleClick}>
        <td>{this.props.index}.</td>
        <td>{track.name}</td>
        <td className="track-duration">{utils.formatDuration(track.duration_ms)}</td>
      </tr>
    );
  }
});

var Playlist = React.createClass({

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
      var isCurrentTrack = this.props.currentTrack.id === track.id;
      if(this.state.isAlbum) {
        _tracks.push(<AlbumTrack isCurrentTrack={isCurrentTrack} index={index+1} key={index} metaData={track} />);
      }
      else {
        _tracks.push(<Track isCurrentTrack={isCurrentTrack} index={index+1} key={index} metaData={track} />);
      }
    });
    var hideColumn = { display: (this.state.isAlbum ? 'none' : 'table-cell') };

    return (
      <table className="table">
        <thead>
          <tr>
            <th className="no">#</th>
            <th>Song</th>
            <th style={hideColumn} className="hidden-xs">Artist</th>
            <th style={hideColumn} className="hidden-xs">Album</th>
            <th className="track-duration"><i className="fa fa-clock-o"></i></th>
          </tr>
        </thead>
        <tbody>
          {_tracks}
        </tbody>
      </table>
    );
  },

  // TODO: Only get cover first time playlist is set
  renderCovers() {
    var albumCover = [];
    if(this.state.isAlbum) {
      albumCover.push(<img src={this.props.tracks[0].album.images[2].url} />);
    }
    else {
      var tracks = _.sample(this.props.tracks, 4);
      tracks.map((track) => {
        albumCover.push(<img src={track.album.images[2].url} />);
      });
    }
    return albumCover;
  },

  render() {
    var playList = '';
    var covers = '';
    if(!_.isEmpty(this.props.tracks)) {
      playList = this.renderPlayList();
      //covers = this.renderCovers();
    }

    return (
      <div className="playlist">
        <h3>{this.props.name} ({this.props.totalTracks} songs)</h3>
        <AddPlaylist />
        {playList}
      </div>
    );
  }
});

export default Playlist;
