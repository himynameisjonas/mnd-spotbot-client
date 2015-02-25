import React from 'react';

var PlayerControls = React.createClass({
  handleClickPlay() {
    this.props.play();
  },
  handleClickPause() {
    this.props.pause();
  },
  handleClickNext() {
    this.props.next();
  },
  render() {
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this.handleClickPlay}><i className="fa fa-play"></i></button>
        <button type="button" className="btn btn-default" onClick={this.handleClickPause}><i className="fa fa-pause"></i></button>
        <button type="button" className="btn btn-default" onClick={this.handleClickNext}><i className="fa fa-step-forward"></i></button>
      </div>
    );
  }
});

export default PlayerControls;
