import Reflux from 'reflux';
import Actions from '../actions/queue_actions';
import request from 'superagent';
import FirebaseRef from 'firebaseRef';
import _ from 'lodash';
import utils from '../utils';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.queue = [];
  },

  onEnqueue(spotifyUri) {
    FirebaseRef.child('queue').push({uri: spotifyUri});
  },

  clearQueue() {
    this.queue = [];
    this.trigger(this.queue);
  },

  onSetQueue(spotifyUris) {
    if(_.isEmpty(spotifyUris)) {
      this.clearQueue();
      return;
    }
    var uris = _.pluck(spotifyUris, 'uri');
    var trackIds = uris.map(uri => {
      return utils.parseSpotifyId(uri);
    });
    request.get('https://api.spotify.com/v1/tracks/').query({ ids: _.take(trackIds, 20).join(',')}).end((res) => {
      this.queue = res.body.tracks;
      this.trigger(this.queue);
    }.bind(this));
  }

});


export default Store;
