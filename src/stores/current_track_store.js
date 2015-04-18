import Reflux from 'reflux';
import Actions from '../actions/current_track_actions';
import request from 'superagent';
import utils from '../utils';
import _ from 'lodash';
import FirebaseRef from 'firebaseRef'

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.obj = {
      currentTrack: null,
      startedAt: 0
    };
  },

  onSetTrack(track) {
    FirebaseRef.child('player/current_track/uri').set(track.uri);
  },

  onGetTrack(track) {
    this.obj.startedAt = track.started_at;
    var trackId = utils.parseSpotifyId(track.uri);
    request.get('https://api.spotify.com/v1/tracks/' + trackId, function(err, res) {
      this.obj.currentTrack = res.body;
      this.trigger(this.obj);
    }.bind(this));
  }

});

export default Store;
