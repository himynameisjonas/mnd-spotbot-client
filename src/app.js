import React from 'react';
import Reflux from 'reflux';
import FirebaseRef from 'firebaseRef';
import _ from 'lodash';

// Components
import CurrentTrack from './current_track';
import Playlist from './playlist';
import Queue from './queue';
import PlayerControls from './player_controls';
import Search from './search';
import SearchResult from './search_result';
import Duration from './duration.js';
import Fullscreen from './fullscreen.js';
import VolumeControl from './volume_control';
import { TabbedArea } from 'react-bootstrap';
import { TabPane } from 'react-bootstrap';

import SearchResultContainer from './search_result_container';

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

const App = React.createClass({
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
      displayFullscreen: false,
      searchResultAlbums: [],
      searchResultTracks: {},
      queue: {},
      playlistName: '',
      songStartedAt: Date.now(),
      isPlaying: false,
      isShuffle: false,
      totalTracks: 0,
      volume: null
      query: ''
    };
  },

  onPlayerChange(obj) {
    this.setState({
      isPlaying: obj.isPlaying,
      isShuffle: obj.isShuffle,
      volume: obj.volume
    });
  },

  onQueueChange(tracks) {
    this.setState({ queue: tracks });
  },

  onTrackChange(obj) {
    this.setState({
      currentTrack: obj.currentTrack,
      songStartedAt: obj.startedAt
    });
  },

  onTracksChange(obj) {
    this.setState({
      tracks: obj.tracks,
      playlistName: obj.name,
      totalTracks: obj.totalTracks//,
      //searchResult: {} // TODO: Clear result instead via action
    });
  },

  onSearchChange() {
    let data = SearchStore.getData();
    this.setState({
      searchResultAlbums: data.albums,
      searchResultTracks: data.tracks,
      query: data.query
    });
  },

  componentDidMount() {
    FirebaseRef.child('playlist/tracks').on('value', (snapshot) => {
      let val = snapshot.val();
      console.log("is set tracks the way to go??");
      if(!_.isNull(val)) {
        PlaylistActions.setTracks(val);
      }
    });
    FirebaseRef.child('playlist/name').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        PlaylistActions.setName(val);
      }
    });
    FirebaseRef.child('player/current_track').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        CurrentTrackActions.getTrack(val);
      }
    });
    FirebaseRef.child('queue').on('value', (snapshot) => {
      let val = _.toArray(snapshot.val());
      QueueActions.setQueue(val);
    });
    FirebaseRef.child('player/playing').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        PlayerActions.setPlayingStatus(val);
      }
    });
    FirebaseRef.child('playlist/shuffle').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        PlayerActions.setShuffleStatus(val);
      }
    });
    FirebaseRef.child('push').on('child_changed', (snapshot) => {
      if(snapshot.key() === 'refresh') {
        window.location.reload();
      }
    });
    FirebaseRef.child('volume').on("value", (snapshot) => {
      PlayerActions.setVolume(snapshot.val());
    });
  },


  render() {

    let searchResultProps = {
      albums: this.state.searchResultAlbums,
      tracks: this.state.searchResultTracks,
      query: this.state.query
    };

    let fullscreenProps = {
      isFullscreenVisible: this.state.isFullscreenVisible,
      track: this.state.currentTrack,
      displayFullscreen: this.state.displayFullscreen,
      isPlaying: this.state.isPlaying
    };

    let durationProps = {
      startedAt: this.state.songStartedAt,
      trackDuration: this.state.currentTrack.duration_ms,
      isPlaying: this.state.isPlaying
    };

    let playerControlsProps = {
      isPlaying: this.state.isPlaying,
      isShuffle: this.state.isShuffle
    };

    let playlistProps = {
      totalTracks: this.state.totalTracks,
      tracks: this.state.tracks,
      name: this.state.playlistName,
      currentTrack: this.state.currentTrack
    };

    let queueLength = _.isEmpty(this.state.queue) ? 0 : this.state.queue.length;

    return (
      <div>
        <Fullscreen {...fullscreenProps}  />
        <Duration {...durationProps} />
        <header id="banner" role="banner">
          <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <CurrentTrack track={this.state.currentTrack} />
                </div>
                <div className="col-xs-12 col-sm-2">
                  <PlayerControls {...playerControlsProps} />
                </div>
                <div className="col-xs-12 col-sm-2">
                  <VolumeControl volume={this.state.volume} />
                </div>
                <div className="col-xs-12 col-sm-4">
                  <Search query={this.state.query} />
                </div>
              </div>
          </div>
        </header>
        <main role="main">
          <SearchResultContainer {...searchResultProps} />
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <TabbedArea defaultActiveKey={1}>
                  <TabPane eventKey={1} tab="Playlist">
                    <Playlist {...playlistProps} />
                  </TabPane>
                  <TabPane eventKey={2} tab={"Queue (" + queueLength + ")"}>
                    <Queue tracks={this.state.queue} />
                  </TabPane>
                </TabbedArea>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
});

React.render(<App />, document.body);
