import React from 'react';
import utils from './utils';

var Track = React.createClass({
  render() {
    var track = this.props.metaData;
    return (
      <div className="media">
          <div className="media-left">
            <img src={track.album.images[2].url} />
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              {track.name} <span className="time">{utils.formatDuration(track.duration_ms)}</span>
            </h4>
            {track.artists[0].name} / {track.album.name}
          </div>
      </div>
    );
  }
});

export default Track;
