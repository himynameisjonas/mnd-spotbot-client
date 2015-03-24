import React from 'react';
import Track from './track';
import _ from 'lodash';

class CurrentTrack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let metaData = '';
    if(!_.isEmpty(this.props.track)) {
      metaData = <Track metaData={this.props.track} />;
    }
    return (
      <div className="current-track">
        {metaData}
      </div>
    );
  }
};

export default CurrentTrack;
