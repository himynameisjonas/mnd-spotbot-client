import Reflux from 'reflux';
import Actions from '../actions/player_actions';
import FirebaseRef from 'firebaseRef';
import _ from 'lodash';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.obj = {
      isPlaying: false,
      isShuffle: false,
      volume: null
    };
  },

  onShuffle() {
    FirebaseRef.child('playlist/shuffle').set(!this.obj.isShuffle);
  },

  onPlay() {
    FirebaseRef.child('player/playing').set(true);
  },

  onPause() {
    FirebaseRef.child('player/playing').set(false);
  },

  onNext() {
    FirebaseRef.child('player/next').set(true);
  },

  onTogglePlay() {
    FirebaseRef.child('player/playing').set(!this.obj.isPlaying);
  },

  onSetPlayingStatus(isPlaying) {
    this.obj.isPlaying = isPlaying;
    this.trigger(this.obj);
  },

  onSetShuffleStatus(isShuffle) {
    this.obj.isShuffle = isShuffle;
    this.trigger(this.obj);
  },

  setVolume(volume) {
    volume = Number(volume);
    if(!_.isFinite(volume)) {
      return "Volume must be a number value between 0-100";
    }
    if(volume < 0) { volume = 0; }
    if(volume > 100) { volume = 100; }
    FirebaseRef.child('volume').set(volume);
    this.obj.volume = volume;
    this.trigger(this.obj);
  }

});

export default Store;
