import React from 'react';
import utils from './utils';
import _ from 'lodash';


var Fullscreen = React.createClass({

  renderTrack() {
    var trackMeta = this.props.track;
    return (
      <div id="fullscreen" className="fullscreen open">
        <img className="cover" src={trackMeta.album.images[2].url} />
        <div className="cover-fade">
          <button className="fullscreen-close"><i className="fa fa-times-circle"></i></button>
          <div className="fullscreen-inner">
            <div className="current-track">
              <h3 className="media-heading">
                {trackMeta.name} <span className="time">{utils.formatDuration(trackMeta.duration_ms)}</span>
              </h3>
              <span className="media-artist-album">{trackMeta.artists[0].name} / {trackMeta.album.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },

  render() {
    var track = '';
    if(!_.isEmpty(this.props.track)) {
      track = this.renderTrack();
    }

    return (
      <div>
        {track}
      </div>
    );
  }
});

export default Fullscreen;
