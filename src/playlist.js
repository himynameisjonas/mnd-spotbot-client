import React from 'react';
import _ from 'lodash';
import utils from './utils';
import QueueActions from './actions/queue_actions';
import PlayerActions from './actions/player_actions';
import CurrentTrackActions from './actions/current_track_actions';
import AddPlaylist from './current_playlist/add_playlist';

class Track extends React.Component {
  handleClick() {
    CurrentTrackActions.setTrack(this.props.metaData);
  }

  handleKeyUp(event) {
    if(event.which === 13) {
      this.handleClick();
    }
  }

  render() {
    let track = this.props.metaData;
    let isCurrentTrack = (this.props.isCurrentTrack) ? 'playlist-current-track' : '';
    return (
      <tr className={isCurrentTrack} onClick={this.handleClick.bind(this)} onKeyUp={this.handleKeyUp.bind(this)} tabIndex="0">
        <td><span className="icon"><i className="fa fa-play"></i></span>{this.props.index}.</td>
        <td>{track.name}</td>
        <td className="hidden-xs">{track.artists[0].name}</td>
        <td className="hidden-xs">{track.album.name}</td>
        <td className="track-duration">{utils.formatDuration(track.duration_ms)}</td>
      </tr>
    );
  }
};

class AlbumTrack extends React.Component {

  handleClick() {
    CurrentTrackActions.setTrack(this.props.metaData);
  }

  handleKeyUp(event) {
    if(event.which === 13) {
      this.handleClick();
    }
  }

  render() {
    let track = this.props.metaData;
    let isCurrentTrack = (this.props.isCurrentTrack) ? 'playlist-current-track' : '';
    return (
      <tr className={isCurrentTrack} onClick={this.handleClick.bind(this)} onKeyUp={this.handleKeyUp.bind(this)} tabIndex="0">
        <td><span className="icon"><i className="fa fa-play"></i></span>{this.props.index}.</td>
        <td>{track.name}</td>
        <td className="track-duration">{utils.formatDuration(track.duration_ms)}</td>
      </tr>
    );
  }
};

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAlbum: false
    };
  }

  componentWillReceiveProps(newProps) {
    let albums = newProps.tracks.map(track => {
      return track.album.uri;
    });
    let isAlbum = _.uniq(albums).length === 1;
    this.setState({ isAlbum: isAlbum });
  }

  renderPlayList() {
    let _tracks = [];
    this.props.tracks.map((track, index) => {
      let isCurrentTrack = this.props.currentTrack.id === track.id;
      if(this.state.isAlbum) {
        _tracks.push(<AlbumTrack isCurrentTrack={isCurrentTrack} index={index+1} key={track.id} metaData={track} />);
      }
      else {
        _tracks.push(<Track isCurrentTrack={isCurrentTrack} index={index+1} key={track.id} metaData={track} />);
      }
    });
    let hideColumn = { display: (this.state.isAlbum ? 'none' : 'table-cell') };

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
  }

  render() {
    if(_.isEmpty(this.props.tracks)) { return false; }
    let playList = '';
    let covers = '';

    return (
      <div className="playlist">
        <h3>{this.props.name} <span className="track-count">({this.props.totalTracks} songs)</span></h3>
        <AddPlaylist />
        {this.renderPlayList()}
      </div>
    );
  }
};

export default Playlist;
