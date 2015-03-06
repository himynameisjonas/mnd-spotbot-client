import Reflux from 'reflux';
import Actions from '../actions/player_actions';
import FirebaseRef from 'firebaseRef';

var Store = Reflux.createStore({
  listenables: Actions,
  init() {
    this.isPlaying = false;
  },
  onShuffle() {
    FirebaseRef.child('playlist/shuffle').set(true);
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
  onSetPlayingStatus(isPlaying) {
    this.isPlaying = isPlaying;
    this.trigger(this.isPlaying);
  }
});

export default Store;
