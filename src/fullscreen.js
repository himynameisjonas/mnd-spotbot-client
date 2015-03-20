import React from 'react';
import utils from './utils';
import _ from 'lodash';


var Fullscreen = React.createClass({

  getInitialState() {
    return { isVisible: false }
  },

  componentDidMount() {
    console.log("componentDidMount");
  },

  toggle() {
    this.setState({ isVisible: !this.state.isVisible });
  },

  renderTrack() {
    var trackMeta = this.props.track;
    var fullScreenClass = this.props.displayFullscreen ? "fullscreen open" : "fullscreen";

    console.log(fullScreenClass);
    console.log("displayFullscreen", this.props.displayFullscreen);

    return (
      <div id="fullscreen" onMouseMove={this.toggle} className={fullScreenClass}>
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
