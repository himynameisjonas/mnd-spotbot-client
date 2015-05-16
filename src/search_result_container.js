import React from 'react';
import AlbumResult from './search_result_container/album_result';
import SearchActions from './actions/search_actions';

class SearchResultContainer extends React.Component {


  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyUp(event) {
    if(event.which === 27) {
      SearchActions.clearSearch();
    }
  }

  render() {
    return (
      <div className="search-result-container">
        <AlbumResult albums={this.props.albums} />
      </div>
    );
  }
};

SearchResultContainer.propTypes = {
  albums: React.PropTypes.array
};

SearchResultContainer.defaultProps = {
  albums: []
};

export default SearchResultContainer;
