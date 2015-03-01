import Reflux from 'reflux';
import Actions from '../actions/search_actions';
import request from 'superagent';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.albums = [];
    this.tracks = [];
  },

  removeAlbum(album) {
    _.remove(this.albums, album);
    this.trigger(this.albums, this.tracks);
  },

  removeTrack(track) {
    _.remove(this.tracks, track);
    this.trigger(this.albums, this.tracks);
  },

  onSearch(query) {
    // Search Albums
    request.get('https://api.spotify.com/v1/search').query({ q: query, limit: 20, type: 'album', market: 'se' }).end((res) => {
      var ids = _.pluck(res.body.albums.items, 'id');
      // Get more album meta-data
      request.get('https://api.spotify.com/v1/albums').query({ ids: ids }).end((res) => {
        this.albums = res.body.albums;

        // Search tracks
        request.get('https://api.spotify.com/v1/search').query({ q: query, limit: 20, type: 'track', market: 'se' }).end((res) => {
          this.tracks = res.body.tracks.items;
          this.trigger(this.albums, this.tracks);
        }.bind(this));

      }.bind(this));
    });
  }

});

export default Store;
