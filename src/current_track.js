import React from 'react';
import Track from './track';
import _ from 'lodash';

var CurrentTrack = React.createClass({
  render() {
    var metaData = '';
    if(!_.isEmpty(this.props.track)) {
      metaData = <Track metaData={this.props.track} />;
    }
    var playingIcon = <i className="fa fa-pause"></i>;
    if(this.props.isPlaying) {
      playingIcon = <i className="fa fa-play"></i>;
    }
    return (
      <div className="current-track">
        <div className="playing-status">
          {playingIcon}
        </div>
        {metaData}
      </div>
    );
  }
});

export default CurrentTrack;
