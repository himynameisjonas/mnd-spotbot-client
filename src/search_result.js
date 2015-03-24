import React from 'react';
import _ from 'lodash';
import SearchActions from './actions/search_actions';
import { Button } from 'react-bootstrap';
import AlbumList from './search_result/album_list';
import TrackList from './search_result/track_list';


class SearchResult extends React.Component {

  componentDidUpdate(newProps) {
    React.findDOMNode(this.refs.$container).focus();
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp(event) {
    if(event.which === 27) {
      SearchActions.clearSearch();
    }
  }

  render() {
    var _albumList = 'No result',
        _trackList = 'No result',
        hasResult = false;

    if(!_.isEmpty(this.props.albums)) {
      _albumList = <AlbumList albums={this.props.albums} />;
    }
    if(!_.isEmpty(this.props.tracks)) {
      _trackList = <TrackList tracks={this.props.tracks} />;
    }
    if(!_.isEmpty(this.props.albums) || !_.isEmpty(this.props.tracks)) {
      hasResult = true;
    }
    var style = {
      display: ((hasResult) ? 'block' : 'none')
    };
    return (
      <div className="search-result" style={style} tabIndex="0" ref="$container">
        <div className="container">
          <h2>Search result</h2>
          <Button className="close" bsStyle="link" onClick={SearchActions.clearSearch} aria-label="Close">&times;</Button>
          <div className="row">
            <div className="col-xs-6">
              <h3>Tracks:</h3>
              {_trackList}
            </div>
            <div className="col-xs-6">
              <h3>Albums:</h3>
              {_albumList}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchResult;
