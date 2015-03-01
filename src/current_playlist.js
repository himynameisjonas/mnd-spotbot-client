import React from 'react';
import Track from './track';
import _ from 'lodash';
import PlaylistActions from './actions/playlist_actions';

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

var CurrentPlaylist = React.createClass({

  renderPlayList() {
    var _tracks = [];
    this.props.tracks.map(track => {
      _tracks.push(<li><Track metaData={track} /></li>);
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
