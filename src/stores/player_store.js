import Reflux from 'reflux';
import Actions from '../actions/player_actions';
import FirebaseRef from 'firebaseRef';

var Store = Reflux.createStore({
  listenables: Actions,
  init() {
    this.obj = {
      isPlaying: false,
      isShuffle: false
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
  }
});

export default Store;
