import React from 'react';
import _ from 'lodash';
import Albums from './album_result/albums';
import AlbumDetails from './album_result/album_details';

class AlbumResult extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {},
      activeAlbum: null
    };
  }

  showAlbumDetails(album) {
    this.setState({ album: album });
  }

  render() {

    let album = this.state.album;

    return (
      <div>
        <Albums albums={this.props.albums} showAlbumDetails={this.showAlbumDetails.bind(this)} />
        <AlbumDetails album={album} />
      </div>
    );
  }
};

AlbumResult.propTypes = { albums: React.PropTypes.array };
AlbumResult.defaultProps = { albums: [] };

export default AlbumResult;
