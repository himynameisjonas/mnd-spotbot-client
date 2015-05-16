import Reflux from 'reflux';

var Actions = Reflux.createActions([
  'play',
  'pause',
  'next',
  'shuffle',
  'setPlayingStatus',
  'setShuffleStatus',
  'togglePlay',
  'changeVolume',
  'setVolume'
]);

export default Actions;
