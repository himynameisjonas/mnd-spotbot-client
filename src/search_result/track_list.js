import React from 'react';
import Image from './image';
import utils from '../utils';
import QueueActions from '../actions/queue_actions';

var Track = React.createClass({
  handleClick() {
    QueueActions.enqueue(this.props.item.uri);
    SearchActions.removeTrack(this.props.item);
  },
  render() {
    var track = this.props.item;
    return (
      <li>
        <div className="media album">
            <Image handleClick={this.handleClick} images={track.album.images} />
            <div className="media-body">
              <h3 className="media-heading">
                {track.name} <span className="time">{utils.formatDuration(track.duration_ms)}</span>
              </h3>
              <h4>{track.artists[0].name}</h4>
            </div>
        </div>
      </li>
    );
  }
});


var TrackList = React.createClass({
  render() {
    var _tracks = this.props.tracks.map(item => {
      return <Track item={item} key={item.id} />;
    });
    return (
      <div>
        <ul className="list-unstyled">
          {_tracks}
        </ul>
      </div>
    );
  }
});

export default TrackList;
