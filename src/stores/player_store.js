import Reflux from 'reflux';
import Actions from '../actions/player_actions';
import FirebaseRef from 'firebaseRef';

var Store = Reflux.createStore({
  listenables: Actions,
  onPlay() {
    FirebaseRef.child('player/playing').set(true);
  },
  onPause() {
    FirebaseRef.child('player/playing').set(false);
  },
  onNext() {
    FirebaseRef.child('player/next').set(true);
  }
});

export default Store;
