import React from 'react';
import request from 'superagent';
import utils from './utils';
import Track from './track';
import _ from 'lodash';

var CurrentPlaylist = React.createClass({

  getInitialState() {
    return {
      playlist: null
    };
  },

  componentWillReceiveProps(newProps) {
    if(typeof(newProps.playlist) === 'undefined') {
      return;
    }
    var trackIds = newProps.playlist.tracks.map(uri => {
      return utils.parseSpotifyId(uri);
    });

    request.get('https://api.spotify.com/v1/tracks/').query({ ids: _.take(trackIds, 20).join(',')}).end((res) => {
      this.setState({ playlist: res.body.tracks });
    }.bind(this));
  },

  renderPlayList() {
    var _tracks = [];
    this.state.playlist.map(track => {
      _tracks.push(<Track metaData={track} />);
    });
    return (
      <ul>
      {_tracks}
      </ul>
    );
  },

  render() {
    var playList = '';
    if(this.state.playlist !== null) {
      playList = this.renderPlayList();
    }
    return (
      <div>
        <h2>Playlist/Album</h2>
        {playList}
      </div>
    );
  }
});

export default CurrentPlaylist;
