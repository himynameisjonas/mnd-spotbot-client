import React from 'react';
import PlayerActions from './actions/player_actions';
import { Button } from 'react-bootstrap';

var PlayerControls = React.createClass({
  render() {
    return (
      <div className="player-controls">
        <div className="btn-group" role="group" aria-label="Player controls">
          <Button bsStyle="default" onClick={PlayerActions.play}><i className="fa fa-play"></i></Button>
          <Button bsStyle="default" onClick={PlayerActions.pause}><i className="fa fa-pause"></i></Button>
          <Button bsStyle="default" onClick={PlayerActions.next}><i className="fa fa-forward"></i></Button>
          <Button bsStyle="default" onClick={PlayerActions.shuffle}><i className="fa fa-random"></i></Button>
        </div>
      </div>
    );
  }
});

export default PlayerControls;
