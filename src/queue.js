import React from 'react';
import Track from './track';
import _ from 'lodash';

class Queue extends React.Component {

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
  }

  render() {
    var playList = '';
    var style = { display: 'none' };
    if(!_.isEmpty(this.props.tracks)) {
      playList = this.renderPlayList();
      style.display = 'block';
    }
    return (
      <div className="queue" style={style}>
        <h3>Queue</h3>
        {playList}
      </div>
    );
  }
};

export default Queue;
