import Reflux from 'reflux';
import Actions from '../actions/search_actions';
import request from 'superagent';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.obj = {
      albums: [],
      tracks: [],
      query: ''
    };
  },

  getData() {
    return this.obj;
  },

  removeAlbum(album) {
    _.remove(this.obj.albums, album);
    this.trigger();
  },

  removeTrack(track) {
    _.remove(this.obj.tracks, track);
    this.trigger();
  },

  clearSearch() {
    this.obj.albums = [];
    this.obj.tracks = [];
    this.obj.query = '';
    this.trigger();
  },

  onSearch(query) {

    if(this.obj.query === query) {
      return;
    }
    if(_.isEmpty(query)) {
      return this.clearSearch();
    }

    this.obj.query = query;
    this.obj.albums = [];
    this.obj.tracks = [];

    // Search tracks
    request.get('https://api.spotify.com/v1/search').query({ q: query, limit: 20, type: 'track', market: 'se' }).end((err, res) => {
      this.obj.tracks = res.body.tracks.items;
      request.get('https://api.spotify.com/v1/search').query({ q: query, limit: 20, type: 'album', market: 'se' }).end((err, res) => {
        var ids = _.pluck(res.body.albums.items, 'id');

        // Get more album meta-data
        if(ids.length) {
          request.get('https://api.spotify.com/v1/albums').query({ ids: ids }).end((err, res) => {
            this.obj.albums = res.body.albums;
            this.trigger();
          }.bind(this));
        }
        else {
          this.trigger();
        }
      });
    }.bind(this));
  }

});

export default Store;
