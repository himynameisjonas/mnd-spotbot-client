import React from 'react';
import Reflux from 'reflux';
import FirebaseRef from 'firebaseRef';
import _ from 'lodash';

// Components
import CurrentTrack from './current_track';
import CurrentPlaylist from './current_playlist';
import Queue from './queue';
import PlayerControls from './player_controls';
import Search from './search';
import SearchResult from './search_result';

// Stores
import PlayerStore from './stores/player_store';
import PlaylistStore from './stores/playlist_store';
import CurrentTrackStore from './stores/current_track_store';
import SearchStore from './stores/search_store';

// Actions
import PlayerActions from './actions/player_actions';
import PlaylistActions from './actions/playlist_actions';
import CurrentTrackActions from './actions/current_track_actions';


var App = React.createClass({
  mixins: [
    Reflux.listenTo(PlaylistStore, 'onTracksChange'),
    Reflux.listenTo(CurrentTrackStore, 'onTrackChange'),
    Reflux.listenTo(SearchStore, 'onSearchChange')
  ],

  getInitialState() {
    return {
      tracks: {},
      currentTrack: {},
      searchResultAlbums: {},
      searchResultTracks: {}
    };
  },

  onTrackChange(track) {
    this.setState({ currentTrack: track });
  },

  onTracksChange(tracks) {
    this.setState({ tracks: tracks, searchResult: {} });
  },

  onSearchChange(albums, tracks) {
    this.setState({
      searchResultAlbums: albums,
      searchResultTracks: tracks
    });
  },

  componentDidMount() {
   FirebaseRef.child('playlist/tracks').on('value', (trackUris) => {
     PlaylistActions.setTracks(trackUris.val());
   });
   FirebaseRef.child('player/current_track').on('value', (trackUri) => {
     CurrentTrackActions.setTrack(trackUri.val());
   });
  },

  render() {
    return (
      <div>
        <header id="banner">
          <div className="container">
              <div className="row">
                <div className="col-xs-4">
                  <PlayerControls />
                </div>
                <div className="col-xs-4">
                  <CurrentTrack track={this.state.currentTrack} />
                </div>
                <div className="col-xs-4">
                  <Search />
                </div>
              </div>
          </div>
        </header>
        <main>
          <div className="row">
            <div className="col-xs-12">
              <SearchResult albums={this.state.searchResultAlbums} tracks={this.state.searchResultTracks} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
            </div>
            <div className="col-xs-6">
              <CurrentPlaylist tracks={this.state.tracks} />
            </div>
          </div>
        </main>
        </div>
    );
  }
});

React.render(<App />, document.body);
