import React from 'react';
import PlayerActions from './actions/player_actions';

class VolumeControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      volume: 0,
      updating: false
    };
    this.timeout = null;
  }

  handleVolumeInput(e) {
    let value = e.currentTarget.value;
    this.setState({ volume: value, updating: true });
    if(this.state.updating) { return; }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      PlayerActions.setVolume(this.state.volume);
      this.setState({ updating: false });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ volume: nextProps.volume });
  }

  render() {

    let volumeProps = {
      defaultValue: this.props.volume,
      onClick: this.handleVolumeInput.bind(this),
      value: this.state.volume,
      onInput: this.handleVolumeInput.bind(this),
      step: 2
    };

    return (
      <div className="volume-control">
        <i className="fa fa-volume-down"></i>
        <input type="range" min="0" max="100" {...volumeProps} />
        <i className="fa fa-volume-up"></i>
      </div>
    );
  }
};

export default VolumeControl;
