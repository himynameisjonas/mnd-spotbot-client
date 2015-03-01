import Reflux from 'reflux';
import Actions from '../actions/search_actions';
import request from 'superagent';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.albums = [];
    this.playlist = [];
  },

  onSearch(query) {
    request.get("https://api.spotify.com/v1/search").query({ q: query, limit: 20, type: 'album', market: 'se' }).end((res) => {
      this.albums = res.body.albums.items;
      this.trigger(this.albums);
    });
  }

});

export default Store;
