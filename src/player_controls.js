import React from 'react';

var PlayerControls = React.createClass({
  render() {
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this.props.play}><i className="fa fa-play"></i></button>
        <button type="button" className="btn btn-default" onClick={this.props.pause}><i className="fa fa-pause"></i></button>
        <button type="button" className="btn btn-default" onClick={this.props.next}><i className="fa fa-step-forward"></i></button>
      </div>
    );
  }
});

export default PlayerControls;
