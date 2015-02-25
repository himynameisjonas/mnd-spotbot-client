import Reflux from 'reflux';
import Actions from './actions';
import request from 'superagent';
import Firebase from 'firebase';
import config from 'config';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.albums = [];
    this.firebase = new Firebase(config.FIREBASE_URL);
  },

  onSearch(query) {
    request.get("https://api.spotify.com/v1/search").query({ q: query, limit: 20, type: 'album', market: 'se' }).end((res) => {
      this.albums = res.body.albums.items;
      this.trigger(this.albums);
    });
  },

  onSetPlaylist(spotifyUri) {
    this.firebase.data.child('playlist/uri').set(spotifyUri);
  },

});

export default Store;
