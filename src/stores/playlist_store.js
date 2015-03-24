import FirebaseRef from 'firebaseRef';
import Reflux from 'reflux';
import Actions from '../actions/playlist_actions';
import request from 'superagent';
import utils from '../utils';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.obj = {
      tracks: [],
      totalTracks: 0,
      name: ''
    };
  },

  onSetName(name) {
    this.obj.name = name;
    this.trigger(this.obj);
  },

  onSetTracks(trackUris) {

    var trackIds = trackUris.map(uri => {
      return utils.parseSpotifyId(uri);
    });

    request.get('https://api.spotify.com/v1/tracks/').query({ ids: _.take(trackIds, 50).join(',')}).end((res) => {
      this.obj.tracks = res.body.tracks;
      this.obj.totalTracks = trackIds.length;
      this.trigger(this.obj);
    }.bind(this));
  },

  onChangePlaylistUri(spotifyUri) {
    FirebaseRef.child('playlist/uri').set(spotifyUri);
  }

});

export default Store;
