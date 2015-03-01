import React from 'react';
import Track from './track';
import _ from 'lodash';

var Queue = React.createClass({

  renderPlayList() {
    var _tracks = [];
    this.props.tracks.map(track => {
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
    if(!_.isEmpty(this.props.tracks)) {
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
