import React from 'react';
import Track from './track';
import _ from 'lodash';

var CurrentTrack = React.createClass({
  render() {
    var metaData = '';
    if(!_.isEmpty(this.props.track)) {
      metaData = <Track metaData={this.props.track} />;
    }
    return (
      <div>
        {metaData}
      </div>
    );
  }
});

export default CurrentTrack;
