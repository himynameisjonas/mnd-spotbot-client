import React from 'react';
import Track from './track';
import _ from 'lodash';
import PlaylistActions from './actions/playlist_actions';
import utils from './utils';
import QueueActions from './actions/queue_actions';
import PlayerActions from './actions/player_actions';
import CurrentTrackActions from './actions/current_track_actions';

var AddPlaylist = React.createClass({
  getInitialState() {
    return { query: '' }
  },

  handleSubmit(event) {
    event.preventDefault();
    PlaylistActions.setPlaylistUri(this.state.query);
    this.setState({ query: '' });
  },

  handleChange(event) {
    this.setState({ query: event.target.value });
  },

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input value={this.state.query} onChange={this.handleChange} ref="$input" type="text" className="form-control" placeholder="Paste spotify uri" />
        </div>
      </form>
    );
  }
});

var Temp = React.createClass({
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
            {track.artists[0].name} / {track.album.name}
          </div>
      </div>
    );
  }
});

var CurrentPlaylist = React.createClass({

  renderPlayList() {

    var albums = this.props.tracks.map(track => {
      return track.album.uri;
    });
    console.log(_.uniq(albums).length);

    var _tracks = [];
    this.props.tracks.map((track, index) => {
      _tracks.push(<li key={index}><Temp metaData={track} /></li>);
    });
    return (
      <ul className="list-unstyled">
      {_tracks}
      </ul>
    );
  },

  render() {
    var playList = '';
    if(!_.isEmpty(this.props.tracks)) {
      playList = this.renderPlayList();
    }
    return (
      <div className="playlist">
        <h3>Playlist/Album <span className="playlist-name">{this.props.name}</span></h3>
        <AddPlaylist />
        {playList}
      </div>
    );
  }
});

export default CurrentPlaylist;
