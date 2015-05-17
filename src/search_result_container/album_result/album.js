import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import SearchActions from '../../actions/search_actions';
import PlaylistActions from '../../actions/playlist_actions';
import PlayerActions from '../../actions/player_actions';

class Album extends React.Component {

  handleShowTracks() {
    this.props.showAlbumDetails(this.props.album);
  }

  handleSearchArtist() {
    SearchActions.search(this.props.album.artists[0].name);
  }

  handlePlayAlbum() {
    PlaylistActions.changePlaylistUri(this.props.album.uri);
    PlayerActions.next();
  }

  render() {

    let album = this.props.album;
    let image = album.images[1].url;
    let name = _.trunc(album.name, 18);
    let artist = _.trunc(album.artists[0].name, 18);

    return (
      <li tabIndex="0">
        <img src={image} />
        <div className="album-info">
          <div className="play-album">
            <Button bsStyle="link" onClick={this.handlePlayAlbum.bind(this)}>
              <i className="fa fa-play-circle-o"></i>
            </Button>
          </div>
          <div className="details">
            <Button bsStyle="link" onClick={this.handleShowTracks.bind(this)}>
              {name}
            </Button>
            <br />
            <Button bsStyle="link" onClick={this.handleSearchArtist.bind(this)} className="artist-name">
              {artist}
            </Button>
          </div>
        </div>
      </li>
    );
  }
};

Album.propTypes = {
  album: React.PropTypes.object,
  showAlbumDetails: React.PropTypes.func
};

Album.defaultProps = {
  album: {}
};

export default Album;
