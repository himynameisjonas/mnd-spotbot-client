import Reflux from 'reflux';
import PlayerActions from '../actions/player_actions';

var Store = Reflux.createStore({
  listenables: PlayerActions,
  init() {
    this.firebaseRef = null;
  },
  onPlay() {
    this.firebaseRef.data.child('player/playing').set(true);
  },
  onPause() {
    this.firebaseRef.data.child('player/playing').set(false);
  },
  onNext() {
    this.firebaseRef.data.child('player/next').set(true);
  },
  onSetPlaylist(spotifyUri) {
    this.firebaseRef.data.child('playlist/uri').set(spotifyUri);
  },
  onSetFirebaseRef(ref) {
    this.firebaseRef = ref;
  }
});

export default Store;
