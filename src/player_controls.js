import React from 'react';
import PlayerActions from './actions/player_actions';
import { Button } from 'react-bootstrap';

class PlayerControls extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var playButton = '';
    var shuffleActive = '';
    if(this.props.isPlaying) {
      playButton = <Button bsStyle="default" onClick={PlayerActions.togglePlay} aria-label="Pause"><i className="fa fa-pause"></i></Button>
    }
    else {
      playButton = <Button bsStyle="default" onClick={PlayerActions.togglePlay} aria-label="Play"><i className="fa fa-play"></i></Button>
    }
    if(this.props.isShuffle) {
      shuffleActive = 'shuffle-active';
    }
    return (
      <div className="player-controls">
        <div className="btn-group" role="group" aria-label="Player controls">
          {playButton}
          <Button bsStyle="default" onClick={PlayerActions.next} aria-label="Next track"><i className="fa fa-forward"></i></Button>
          <Button bsStyle="default" className={shuffleActive} onClick={PlayerActions.shuffle} aria-label="Shuffle playlist"><i className="fa fa-random"></i></Button>
        </div>
      </div>
    );
  }
};

export default PlayerControls;
