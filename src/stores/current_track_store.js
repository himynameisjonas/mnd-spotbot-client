import Reflux from 'reflux';
import Actions from '../actions/current_track_actions';
import request from 'superagent';
import utils from '../utils';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,
  init() {
    this.currentTrack = [];
  },
  onSetTrack(trackUri) {
    var trackId = utils.parseSpotifyId(trackUri);
    request.get('https://api.spotify.com/v1/tracks/' + trackId, function(res) {
      this.currentTrack = res.body;
      this.trigger(this.currentTrack);
    }.bind(this));
  }

});

export default Store;
