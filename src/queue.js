import React from 'react';
import _ from 'lodash';
import utils from './utils';
import CurrentTrackActions from './actions/current_track_actions';

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
    var track = this.props.metaData;
    return (
      <tr onClick={this.handleClick.bind(this)} onKeyUp={this.handleKeyUp.bind(this)} tabIndex="0">
        <td><span className="icon"><i className="fa fa-play"></i></span>{this.props.index}.</td>
        <td>{track.name}</td>
        <td className="hidden-xs">{track.artists[0].name}</td>
        <td className="hidden-xs">{track.album.name}</td>
        <td className="track-duration">{utils.formatDuration(track.duration_ms)}</td>
      </tr>
    );
  }
};

class Queue extends React.Component {

  renderPlayList() {
    var _tracks = [];
    this.props.tracks.map((track, index) => {
      _tracks.push(<Track metaData={track} key={track.id} index={index+1} />);
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="no">#</th>
            <th>Song</th>
            <th className="hidden-xs">Artist</th>
            <th className="hidden-xs">Album</th>
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
    var playList = 'Queue is empty';
    if(!_.isEmpty(this.props.tracks)) {
      playList = this.renderPlayList();
    }
    return (
      <div className="queue playlist">
        {playList}
      </div>
    );
  }
};

export default Queue;
