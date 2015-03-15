import Reflux from 'reflux';

var Actions = Reflux.createActions([
  'play',
  'pause',
  'next',
  'shuffle',
  'setPlayingStatus',
  'setShuffleStatus',
  'togglePlay'
]);

export default Actions;
