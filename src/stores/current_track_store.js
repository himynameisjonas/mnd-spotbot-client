import Reflux from 'reflux';
import Actions from '../actions/current_track_actions';
import request from 'superagent';
import utils from '../utils';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,
  init() {
    this.currentTrack = null;
    this.startedAt = 0;
  },
  onSetTrack(track) {
    this.startedAt = track.started_at;
    var trackId = utils.parseSpotifyId(track.uri);
    request.get('https://api.spotify.com/v1/tracks/' + trackId, function(res) {
      this.currentTrack = res.body;
      this.trigger(this.currentTrack, this.startedAt);
    }.bind(this));
  }

});

export default Store;
