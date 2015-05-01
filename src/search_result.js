import React from 'react';
import _ from 'lodash';
import SearchActions from './actions/search_actions';
import { Button } from 'react-bootstrap';
import AlbumList from './search_result/album_list';
import TrackList from './search_result/track_list';


class SearchResult extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyUp(event) {
    if(event.which === 27) {
      SearchActions.clearSearch();
    }
  }

  render() {
    var _albumList = 'No result',
        _trackList = 'No result',
        hasQuery = false;

    if(!_.isEmpty(this.props.albums)) {
      _albumList = <AlbumList albums={this.props.albums} />;
    }
    if(!_.isEmpty(this.props.tracks)) {
      _trackList = <TrackList tracks={this.props.tracks} />;
    }
    if(!_.isEmpty(this.props.query)) {
      hasQuery = true;
    }
    var style = {
      display: ((hasQuery) ? 'block' : 'none')
    };
    return (
      <div className="search-result" style={style}>
        <div className="container">
          <h3>Search result</h3>
          <Button className="close" bsStyle="link" onClick={SearchActions.clearSearch} aria-label="Close">&times;</Button>
          <div className="row">
            <div className="col-xs-6">
              <h4>Tracks:</h4>
              {_trackList}
            </div>
            <div className="col-xs-6">
              <h4>Albums:</h4>
              {_albumList}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchResult;
