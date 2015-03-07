import React from 'react';
import utils from './utils';
import CurrentTrackActions from './actions/current_track_actions';

var Track = React.createClass({
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

export default Track;
