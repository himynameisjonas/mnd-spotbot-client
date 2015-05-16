import React from 'react';
import _ from 'lodash';
import Album from './album';

class Albums extends React.Component {
  render() {

    if(_.isEmpty(this.props.albums)) { return false; }

    let albums = this.props.albums.map((album, index) => {
      return <Album album={album} showAlbumDetails={this.props.showAlbumDetails} key={index} />
    });

    let style = { width: albums.length * 150 };

    return (
      <div className="albums">
        <ul className="list-unstyled" style={style}>
          {albums}
        </ul>
      </div>
    );
  }
};

Albums.propTypes = {
  albums: React.PropTypes.array,
  showAlbumDetails: React.PropTypes.func
};

Albums.defaultProps = { albums: [] };

export default Albums;
