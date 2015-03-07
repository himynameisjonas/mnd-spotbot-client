import React from 'react';
import Reflux from 'reflux';
import FirebaseRef from 'firebaseRef';
import _ from 'lodash';
import from './styles/main.scss';

// Components
import CurrentTrack from './current_track';
import CurrentPlaylist from './current_playlist';
import Queue from './queue';
import PlayerControls from './player_controls';
import Search from './search';
import SearchResult from './search_result';
import Duration from './duration.js';

// Stores
import PlayerStore from './stores/player_store';
import PlaylistStore from './stores/playlist_store';
import CurrentTrackStore from './stores/current_track_store';
import SearchStore from './stores/search_store';
import QueueStore from './stores/queue_store';

// Actions
import PlayerActions from './actions/player_actions';
import PlaylistActions from './actions/playlist_actions';
import CurrentTrackActions from './actions/current_track_actions';
import QueueActions from './actions/queue_actions';


var App = React.createClass({
  mixins: [
    Reflux.listenTo(PlayerStore, 'onPlayerChange'),
    Reflux.listenTo(PlaylistStore, 'onTracksChange'),
    Reflux.listenTo(CurrentTrackStore, 'onTrackChange'),
    Reflux.listenTo(SearchStore, 'onSearchChange'),
    Reflux.listenTo(QueueStore, 'onQueueChange')
  ],

  getInitialState() {
    return {
      tracks: {},
      currentTrack: {},
      searchResultAlbums: {},
      searchResultTracks: {},
      queue: {},
      playlistName: '',
      songStartedAt: Date.now(),
      isPlaying: false
    };
  },

  onPlayerChange(status) {
    this.setState({ isPlaying: status });
  },

  onQueueChange(tracks) {
    this.setState({ queue: tracks });
  },

  onTrackChange(track, startedAt) {
    this.setState({
      currentTrack: track,
      songStartedAt: startedAt
    });
  },

  onTracksChange(tracks, name) {
    this.setState({
      tracks: tracks,
      playlistName: name,
      searchResult: {}
    });
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
    FirebaseRef.child('playlist/name').on('value', (name) => {
      PlaylistActions.setName(name.val());
    });
    FirebaseRef.child('player/current_track').on('value', (track) => {
      CurrentTrackActions.setTrack(track.val());
    });
    FirebaseRef.child('queue').on('value', (trackUris) => {
      QueueActions.setQueue(_.toArray(trackUris.val()));
    });
    FirebaseRef.child('player/playing').on('value', (snapshot) => {
      PlayerActions.setPlayingStatus(snapshot.val());
    });
  },

  render() {
    return (
      <div>
        <Duration startedAt={this.state.songStartedAt} trackDuration={this.state.currentTrack.duration_ms} isPlaying={this.state.isPlaying} />
        <header id="banner">
          <div className="container">
              <div className="row">
                <div className="col-xs-3">
                  <PlayerControls />
                </div>
                <div className="col-xs-6">
                  <CurrentTrack track={this.state.currentTrack} isPlaying={this.state.isPlaying} />
                </div>
                <div className="col-xs-3">
                  <Search />
                </div>
              </div>
          </div>
        </header>
        <main>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <SearchResult albums={this.state.searchResultAlbums} tracks={this.state.searchResultTracks} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <Queue tracks={this.state.queue} />
              </div>
              <div className="col-xs-6">
                <CurrentPlaylist tracks={this.state.tracks} name={this.state.playlistName} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
});

React.render(<App />, document.body);
