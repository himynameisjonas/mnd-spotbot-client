import Reflux from 'reflux';

var Actions = Reflux.createActions([
  'play',
  'pause',
  'next',
  'shuffle',
  'setPlayingStatus',
  'togglePlay'
]);

export default Actions;
