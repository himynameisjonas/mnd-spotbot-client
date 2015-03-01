import FirebaseRef from 'firebaseRef';
import Reflux from 'reflux';
import Actions from '../actions/playlist_actions';
import request from 'superagent';
import utils from '../utils';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,
  init() {
    this.tracks = [];
  },
  onSetTracks(trackUris) {
    // Tracks will be null the first time we set a new playlist
    if(trackUris === null) {
      return;
    }
    var trackIds = trackUris.map(uri => {
      return utils.parseSpotifyId(uri);
    });
    request.get('https://api.spotify.com/v1/tracks/').query({ ids: _.take(trackIds, 20).join(',')}).end((res) => {
      this.tracks = res.body.tracks;
      this.trigger(this.tracks);
    }.bind(this));
  },
  onSetPlaylistUri(spotifyUri) {
    FirebaseRef.child('playlist/uri').set(spotifyUri);
  }

});

export default Store;
