import React from 'react';

class Image extends React.Component {

  handleKeyUp(event) {
    if(event.which === 13) {
      this.props.handleClick();
    }
  }

  renderImage() {
    var imageUrl = '';
    var urls = this.props.images;
    switch(urls.length) {
      case 3:
        imageUrl = urls[2].url;
        break;
      case 2:
        imageUrl = urls[1].url;
        break;
      case 1:
        imageUrl = urls[0].url;
        break;
      default: return; // TODO Return default image:
    }
    return (
      <span>
        <img src={imageUrl} />
        <div className="enqueue">
          <i className="fa fa-plus"></i>
        </div>
      </span>
    );
  }

  render() {
    var imageUrls = this.props.images;
    var image = '';
    if(typeof(imageUrls) !== 'undefined' && imageUrls.length !== 0) {
      image = this.renderImage();
    }
    return (
      <div className="media-left" onKeyUp={this.handleKeyUp.bind(this)} onClick={this.props.handleClick} tabIndex="0">
        {image}
      </div>
    );
  }
};

export default Image;
