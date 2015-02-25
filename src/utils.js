export default {
  parseSpotifyId(uri) {
    return uri.split(':')[2];
  },
  formatDuration(ms) {
    ms = parseInt(ms, 10) / 1000;
    var minutes = Math.floor(ms / 60);
    var seconds = Math.floor(ms - (minutes * 60));

    if(minutes < 10){
      minutes = `0${minutes}`;
    }
    if(seconds < 10){
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
};
