import React from 'react';
import PlayerActions from './actions/player_actions';

class VolumeControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      volume: 0
    };
    this.timeout = null;
  }

  handleVolumeInput(e) {
    let value = e.currentTarget.value;
    this.setState({ volume: value });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() =>
      PlayerActions.setVolume(value)
   , 100);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ volume: nextProps.volume });
  }

  render() {
    return (
      <div className="volume-control">
        <i className="fa fa-volume-down"></i>
        <input type="range" min="0" max="100" defaultValue={this.props.volume} onClick={this.handleVolumeInput.bind(this)} value={this.state.volume} onInput={this.handleVolumeInput.bind(this)} />
        <i className="fa fa-volume-up"></i>
      </div>
    );
  }

};

export default VolumeControl;
