import React from 'react';
import Image from './image';

var Album = React.createClass({
  handleClick() {
    PlaylistActions.changePlaylistUri(this.props.item.uri);
    SearchActions.removeAlbum(this.props.item);
  },
  render() {
    var album = this.props.item;
    return (
      <li>
        <div className="media album">
            <Image handleClick={this.handleClick} images={album.images} />
            <div className="media-body">
              <h3 className="media-heading">
                {album.name} <span className="release-date">{album.release_date}</span>
              </h3>
              <h4>{album.artists[0].name}</h4>
            </div>
        </div>
      </li>
    );
  }
});

var AlbumList = React.createClass({
  render() {
    var _albums = this.props.albums.map((item, index) => {
      return <Album item={item} key={index} />;
    });
    return (
      <div>
        <ul className="list-unstyled">
          {_albums}
        </ul>
      </div>
    );
  }
});

export default AlbumList;
