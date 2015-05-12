import React from 'react';
import _ from 'lodash';

class Album extends React.Component {
  render() {
    return(
      <li>
        <img src={this.props.album.images[1].url} />
      </li>
    );
  }
};;

class Albums extends React.Component {
  render() {
    if(_.isEmpty(this.props.albums)) { return <span></span>; }
    let _albums = this.props.albums.map((album) => {
      return <Album album={album} />;
    });
    let size = _albums.length;
    let style = {
      width: (size * 150) + 'px'
    };
    return (
      <div className="albums clearfix">
        <ul className="list-unstyled" style={style}>
          {_albums}
        </ul>
      </div>
    );
  }
};

export default Albums;
