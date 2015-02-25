import React from 'react';
import config from 'config';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import _ from 'lodash';
import CurrentTrack from './current_track';
import CurrentPlaylist from './current_playlist';
import Queue from './queue';
import PlayerControls from './player_controls';
import Search from './search';
import Actions from './actions';
import SearchStore from './search_store';
import Reflux from 'reflux';

var App = React.createClass({
  mixins: [ReactFireMixin, Reflux.listenTo(SearchStore, 'onSearchChange')],

  getInitialState() {
    return {
      data: {}
    };
  },

  onSearchChange(data) {
    debugger;
  },

  componentWillMount() {
    var ref = new Firebase(config.FIREBASE_URL);
    this.bindAsObject(ref, "data");
  },

  playPause() {
    var data = this.state.data;
    this.firebaseRefs.data.child('player/playing').set(!data[0].playing);
  },

  play() {
    var data = this.state.data;
    this.firebaseRefs.data.child('player/playing').set(true);
  },
  pause() {
    var data = this.state.data;
    this.firebaseRefs.data.child('player/playing').set(false);
  },
  next() {
    this.firebaseRefs.data.child('player/next').set(true);
  },

  render() {
    debugger;
    return (
      <div className="container">
        <header>
          <div className="row">
            <div className="col-xs-4">
              <CurrentTrack track={this.state.data.player} />
            </div>
            <div className="col-xs-4">
              <PlayerControls play={this.play} pause={this.pause} next={this.next} />
            </div>
            <div className="col-xs-4">
              <Search />
            </div>
          </div>
        </header>
        <main>
          <div className="row">
            <div className="col-xs-6">
              <Queue playlist={this.state.data.queue} />
            </div>
            <div className="col-xs-6">
              <CurrentPlaylist playlist={this.state.data.playlist} />
            </div>
          </div>
        </main>
      </div>
    );
  }
});

React.render(<App />, document.body);
