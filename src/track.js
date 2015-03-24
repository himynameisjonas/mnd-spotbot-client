import React from 'react';
import utils from './utils';
import CurrentTrackActions from './actions/current_track_actions';

class Track extends React.Component {

  handleClick() {
    CurrentTrackActions.setTrack(this.props.metaData);
  }

  render() {
    var track = this.props.metaData;
    return (
      <div className="media track">
          <div className="media-left" onClick={this.handleClick.bind(this)}>
            <img src={track.album.images[2].url} />
          </div>
          <div className="media-body">
            <h3 className="media-heading">
              {track.name} <span className="time">{utils.formatDuration(track.duration_ms)}</span>
            </h3>
            <span className="media-artist-album">{track.artists[0].name} / {track.album.name}</span>
          </div>
      </div>
    );
  }
};

export default Track;
