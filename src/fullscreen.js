import React from 'react';
import utils from './utils';
import _ from 'lodash';

React.initializeTouchEvents(true);

class Fullscreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.timer = null;
  }

  componentDidMount() {
    window.addEventListener('keyup', this.hide.bind(this));
    window.addEventListener('mousemove', this.hide.bind(this));
    window.addEventListener('touchmove', this.hide.bind(this));
    window.addEventListener('click', this.hide.bind(this));
    this.setTimer();
  }

  setTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() =>
      this.setState({ isVisible: true })
    , 15000);
  }

  hide() {
    if(this.state.isVisible) {
      this.setState({ isVisible: false });
      this.setTimer();
    }
  }

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
  }

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
};

export default Fullscreen;
