import React from 'react';
import _ from 'lodash';

class Album extends React.Component {
  handleClick() {
    this.props.showTracks(this.props.album);
  }
  render() {
    return(
      <li>
        <img onClick={this.handleClick.bind(this)} src={this.props.album.images[1].url} />
      </li>
    );
  }
};

class Track extends React.Component {
  render() {
    let track = this.props.track;
    return (
      <li>{track.name}</li>
    );
  }
};

class AlbumTracks extends React.Component {
  render() {
    if(_.isEmpty(this.props.tracks)) { return false; }

    console.log(this.props.tracks);
    let tracks = this.props.tracks.map((track) => {
      return <Track track={track} />;
    });

    return (
      <div className="album-tracks">
        <ol>
          {tracks}
        </ol>
      </div>
    );
  }
};

class Albums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      albumTracks: []
    };
  }

  showTracks(album) {
    this.setState({ albumTracks: album.tracks.items });
  }

  render() {
    if(_.isEmpty(this.props.albums)) { return false; }

    let _albums = this.props.albums.map((album) => {
      return <Album album={album} showTracks={this.showTracks.bind(this)} />;
    });

    let size = _albums.length;
    let style = {
      width: (size * 150) + 'px'
    };

    return (
      <div>
        <div className="albums clearfix">
          <ul className="list-unstyled" style={style}>
            {_albums}
          </ul>
        </div>
        <AlbumTracks tracks={this.state.albumTracks} />
      </div>
    );
  }
};

export default Albums;
