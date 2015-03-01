import React from 'react';
import request from 'superagent';
import utils from './utils';
import Track from './track';
import _ from 'lodash';

var Queue = React.createClass({

  getInitialState() {
    return {
      playlist: null
    };
  },

  /*
  componentWillReceiveProps(newProps) {
    if(typeof(newProps.playlist) === 'undefined') {
      return;
    }

    var trackIds = _.toArray(newProps.playlist).map(track => {
      return utils.parseSpotifyId(track.uri);
    });

    request.get('https://api.spotify.com/v1/tracks/').query({ ids: _.take(trackIds, 20).join(',')}).end((res) => {
      this.setState({ playlist: res.body });
    }.bind(this));
  },
 */

  renderPlayList() {
    var _tracks = [];
    this.state.playlist.tracks.map(track => {
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
        <h2>Queue</h2>
        {playList}
      </div>
    );
  }
});

export default Queue;
