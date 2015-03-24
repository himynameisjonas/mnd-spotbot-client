import React from 'react';
import PlaylistActions from '../actions/playlist_actions';

class AddPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    PlaylistActions.changePlaylistUri(this.state.query);
    this.setState({ query: '' });
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input value={this.state.query} onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Paste spotify uri OR link" />
        </div>
      </form>
    );
  }
};

export default AddPlaylist;
