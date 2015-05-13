import React from 'react';
import PlayerActions from './actions/player_actions';
import _ from 'lodash';

class VolumeControl extends React.Component {

  constructor(props) {
    super(props);

    this.setVolume = _.debounce(() => {
      let vol = React.findDOMNode(this.refs.inputRange).value;
      PlayerActions.setVolume(vol);
    }, 200);
  }

  render() {

    if(this.props.volume === null) { return false; }

    let volumeProps = {
      onClick: this.setVolume.bind(this),
      onChange: this.setVolume.bind(this),
      defaultValue: this.props.volume,
      ref: 'inputRange',
      type: 'range',
      step: 2,
      min: 0,
      max: 100
    };

    return (
      <div className="volume-control">
        <i className="fa fa-volume-down"></i>
        <input {...volumeProps} />
        <i className="fa fa-volume-up"></i>
      </div>
    );
  }
};

VolumeControl.propTypes = { volume: React.PropTypes.number };
VolumeControl.defaultProps = { volume: null };

export default VolumeControl;
