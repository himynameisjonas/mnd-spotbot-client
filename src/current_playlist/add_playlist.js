import React from 'react';
import PlaylistActions from '../actions/playlist_actions';

var AddPlaylist = React.createClass({
  getInitialState() {
    return { query: '' }
  },

  handleSubmit(event) {
    event.preventDefault();
    PlaylistActions.setPlaylistUri(this.state.query);
    this.setState({ query: '' });
  },

  handleChange(event) {
    this.setState({ query: event.target.value });
  },

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input value={this.state.query} onChange={this.handleChange} ref="$input" type="text" className="form-control" placeholder="Paste spotify uri" />
        </div>
      </form>
    );
  }
});

export default AddPlaylist;
