import React from 'react';
import Track from './track';
import _ from 'lodash';

var Queue = React.createClass({

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
    var playList = <div>Queue is empty</div>;;
    if(!_.isEmpty(this.props.tracks)) {
      playList = this.renderPlayList();
    }
    return (
      <div>
        <h3>Queue</h3>
        {playList}
      </div>
    );
  }
});

export default Queue;
