import React from 'react';
import Reflux from 'reflux';

// Components
import CurrentTrack from './current_track';

// Stores
import CurrentTrackStore from './stores/current_track_store';

var Fullscreen = React.createClass({

  render() {
    return (
      <div id="fullscreen" className="fullscreen">
        <img className="cover" src={this.state.currentTrack.album.images[2].url} />
        <div className="cover-fade">
          <button className="fullscreen-close"><i className="fa fa-times-circle"></i></button>
          <div className="fullscreen-inner">
            <CurrentTrack track={this.state.currentTrack} isPlaying={this.state.isPlaying} />
          </div>
        </div>
      </div>
    );
  }
});

export default Fullscreen;
