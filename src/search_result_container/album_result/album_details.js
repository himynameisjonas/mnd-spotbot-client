import React from 'react';
import _ from 'lodash';
import utils from '../../utils';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import QueueActions from '../../actions/queue_actions';
import CurrentTrackActions from '../../actions/current_track_actions';

class Track extends React.Component {

  handleQueueTrack() {
    QueueActions.enqueue(this.props.track.uri);
  }

  handlePlayTrack() {
    CurrentTrackActions.setTrack(this.props.track);
  }

  render() {

    let track = this.props.track;

    return (
      <tr>
        <td>{track.track_number}.</td>
        <td>{track.name}</td>
        <td>
          <OverlayTrigger placement="top" overlay={<Tooltip>Queue track</Tooltip>}>
            <Button bsStyle="link" onClick={this.handleQueueTrack.bind(this)}>
              <i className="fa fa-th-list"></i>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Play track</Tooltip>}>
            <Button bsStyle="link" onClick={this.handlePlayTrack.bind(this)}>
              <i className="fa fa-play-circle-o"></i>
            </Button>
          </OverlayTrigger>
        </td>
        <td className="track-duration">
          {utils.formatDuration(track.duration_ms)}
        </td>
      </tr>
    );
  }
};

Track.propTypes = { track: React.PropTypes.object };
Track.defaultProps = { track: {} };

class AlbumDetails extends React.Component {
  render() {

    let album = this.props.album;
    if(_.isEmpty(album)) { return false; }

    let tracks = album.tracks.items.map((track, index) => {
      return <Track track={track} key={index} />;
    });

    // TODO: Make a general playlist table
    let releaseDate = album.release_date.substring(0,4);

    return (
      <div className="album-details">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="playlist">
                <table className="table">
                  <caption>{album.artists[0].name} / {album.name} ({releaseDate})</caption>
                  <thead>
                    <tr>
                      <th className="no">#</th>
                      <th>Song</th>
                      <th>Actions</th>
                      <th className="track-duration"><i className="fa fa-clock-o"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tracks}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

AlbumDetails.propTypes = { album: React.PropTypes.object };
AlbumDetails.defaultProps = { album: {} };

export default AlbumDetails;
