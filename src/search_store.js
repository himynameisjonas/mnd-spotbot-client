import Reflux from 'reflux';
import Actions from './actions';
import request from 'superagent';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.albums = [];
  },

  onSearch(query) {
    request.get("https://api.spotify.com/v1/search").query({ q: query, limit: 20, type: 'album', market: 'se' }).end((res) => {
      this.albums = res.body.albums.items;
      console.log(this.albums);
      this.trigger(this.albums);
    });
  }

});

export default Store;
