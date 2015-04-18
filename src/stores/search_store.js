import Reflux from 'reflux';
import Actions from '../actions/search_actions';
import request from 'superagent';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.obj = {
      albums: [],
      tracks: []
    };
  },

  removeAlbum(album) {
    _.remove(this.obj.albums, album);
    this.trigger(this.obj);
  },

  removeTrack(track) {
    _.remove(this.obj.tracks, track);
    this.trigger(this.obj);
  },

  clearSearch() {
    this.obj.albums = [];
    this.obj.tracks = [];
    this.trigger(this.obj);
  },

  onSearch(query) {

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
            this.trigger(this.obj);
          }.bind(this));
        }
        else {
          this.trigger(this.obj);
        }
      });
    }.bind(this));
  }

});

export default Store;
