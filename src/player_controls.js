import React from 'react';
import PlayerActions from './actions/player_actions';

var PlayerControls = React.createClass({
  render() {
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={PlayerActions.play}><i className="fa fa-play"></i></button>
        <button type="button" className="btn btn-default" onClick={PlayerActions.pause}><i className="fa fa-pause"></i></button>
        <button type="button" className="btn btn-default" onClick={PlayerActions.next}><i className="fa fa-step-forward"></i></button>
      </div>
    );
  }
});

export default PlayerControls;
