import React from 'react';
import PlayerActions from './actions/player_actions';
import _ from 'lodash';

class VolumeControl extends React.Component {

  constructor(props) {
    super(props);

    this.changeVolume = _.debounce(() => {
      let vol = React.findDOMNode(this.refs.inputRange).value;
      PlayerActions.changeVolume(vol);
    }, 200);
  }

  render() {

    if(this.props.volume === null) { return false; }

    let volumeProps = {
      onClick: this.changeVolume.bind(this),
      onChange: this.changeVolume.bind(this),
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
