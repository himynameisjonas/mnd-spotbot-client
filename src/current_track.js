import React from 'react';
import request from 'superagent';
import utils from './utils';
import Track from './track';

var CurrentTrack = React.createClass({

  getInitialState() {
    return {
      metaData: null
    };
  },

  componentWillReceiveProps(newProps) {
    var trackId = utils.parseSpotifyId(newProps.track.current_track);
    request.get('https://api.spotify.com/v1/tracks/' + trackId, function(res) {
      this.setState({ metaData: res.body });
    }.bind(this));
  },

  render() {
    var metaData = '';
    if(this.state.metaData !== null) {
      metaData = <Track metaData={this.state.metaData} />;
    }
    return (
      <div>
        {metaData}
      </div>
    );
  }
});

export default CurrentTrack;
