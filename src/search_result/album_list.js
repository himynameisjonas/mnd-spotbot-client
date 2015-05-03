import React from 'react';
import Image from './image';
import PlaylistActions from '../actions/playlist_actions';
import SearchActions from '../actions/search_actions';
import { Button } from 'react-bootstrap';
import QueueActions from '../actions/queue_actions';

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isQueued: false
    };
  }

  handleClick() {
    QueueActions.enqueue(this.props.track.uri);
    this.setState({ isQueued: true });
  }

  render() {
    let queuSymbolClass = 'fa fa-plus';
    if(this.state.isQueued) {
      queuSymbolClass = 'fa fa-check';
    }
    return (
      <li className="album-track">
        <Button bsStyle="link" bsSize="xsmall" onClick={this.handleClick.bind(this)}>
          <i className={queuSymbolClass}></i> {this.props.track.name}
        </Button>
      </li>
    );
  }
};

class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTracks: false
    };
  }

  handleClick() {
    PlaylistActions.changePlaylistUri(this.props.item.uri);
    SearchActions.removeAlbum(this.props.item);
  }

  toggleTracks() {
    this.setState({ showTracks: !this.state.showTracks });
  }

  searchArtist() {
    SearchActions.search(this.props.item.artists[0].name);
  }

  render() {
    let album = this.props.item;
    let tracks = this.props.item.tracks.items.map((track) => {
      return <Track track={track} />;
    });
    let showTracksClass = (this.state.showTracks) ? 'show' : 'hide';
    let chevronClass = (this.state.showTracks) ? 'fa fa-chevron-up' : 'fa fa-chevron-down';

    return (
      <li className="list-group-item">
        <div className="media album">
            <Image handleClick={this.handleClick.bind(this)} images={album.images} />
            <div className="media-body">
              <h3 className="media-heading">
                {album.name} <span className="release-date">{album.release_date}</span>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.toggleTracks.bind(this)}>
                   <i className={chevronClass}></i>
                </Button>
              </h3>
              <h4>
                <Button onClick={this.searchArtist.bind(this)} bsStyle="link" bsSize="xsmall">{album.artists[0].name}</Button>
              </h4>
            </div>
        </div>
        <ul className={showTracksClass + " list-unstyled album-tracks"}>
          {tracks}
        </ul>
      </li>
    );
  }
};

class AlbumList extends React.Component {
  render() {
    var _albums = this.props.albums.map(item => {
      return <Album item={item} key={item.id} />;
    });
    return (
      <div>
        <ul className="list-group">
          {_albums}
        </ul>
      </div>
    );
  }
};

export default AlbumList;
