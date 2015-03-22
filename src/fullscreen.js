import React from 'react';
import utils from './utils';
import _ from 'lodash';

var Fullscreen = React.createClass({

  timer: null,
  getInitialState() {
    return { isVisible: false }
  },

  componentDidMount() {
    this.setTimer();
    window.addEventListener('keyup', this.hide);
    window.addEventListener('mousemove', this.hide);
  },

  setTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() =>
      this.setState({ isVisible: true })
    , 15000);
  },

  hide() {
    if(this.state.isVisible) {
      this.setState({ isVisible: false });
      this.setTimer();
    }
  },

  renderTrack() {
    var trackMeta = this.props.track;
    var fullScreenClass = (this.state.isVisible && this.props.displayFullscreen) ? "fullscreen open" : "fullscreen";

    return (
      <div id="fullscreen" className={fullScreenClass} onClick={this.hide}>
        <img className="cover" src={trackMeta.album.images[0].url} />
        <div className="cover-fade">
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
