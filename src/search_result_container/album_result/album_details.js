import React from 'react';
import _ from 'lodash';
import QueueActions from '../../actions/queue_actions';

class Track extends React.Component {

  handleClick() {
    QueueActions.enqueue(this.props.track.uri);
  }

  render() {

    let track = this.props.track;

    return (
      <li onClick={this.handleClick.bind(this)}>
        {track.track_number} {track.name}
      </li>
    );
  }
};

Track.propTypes = {
  track: React.PropTypes.object
};

Track.defaultProps = {
  track: {}
};

class AlbumDetails extends React.Component {
  render() {

    let album = this.props.album;
    if(_.isEmpty(album)) { return false; }

    let tracks = album.tracks.items.map((track, index) => {
      return <Track track={track} key={index} />;
    });

    return (
      <div className="album-details">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>{album.artists[0].name} / {album.name}</h3>
              <ol className="list-unstyled">
                {tracks}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

AlbumDetails.propTypes = {
  album: React.PropTypes.object
};

AlbumDetails.defaultProps = {
  album: {}
};

export default AlbumDetails;
