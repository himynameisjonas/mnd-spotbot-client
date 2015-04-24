import Reflux from 'reflux';
import Actions from '../actions/player_actions';
import FirebaseRef from 'firebaseRef';

var Store = Reflux.createStore({
  listenables: Actions,

  init() {
    this.obj = {
      isPlaying: false,
      isShuffle: false,
      volume: 0
    };
  },

  changeVolumeBy(amount) {
    FirebaseRef.child('volume').once("value", function(snapshot){
      var current_vol = snapshot.val()
      current_vol = current_vol + amount
      if (current_vol < 0) { current_vol = 0}
      if (current_vol > 100) { current_vol = 100}
      FirebaseRef.child('volume').set(current_vol)
    })
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
    if(volume < 0) { volume = 0; }
    if(volume > 100) { volume = 100; }
    FirebaseRef.child('volume').set(volume);
    this.obj.volume = volume;
    this.trigger(this.obj);
  }

});

export default Store;
