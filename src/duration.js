import React from 'react';

var Duration = React.createClass({
  getInitialState() {
    return { elapsed: 0 }
  },

  tick() {
    this.setState({ elapsed: (Date.now() - this.props.startedAt) });
  },

  componentDidMount() {
    this.timer = setInterval(this.tick, 100);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  render() {

    var width = (this.state.elapsed / this.props.trackDuration) * 100;
    var style = {
      width: width.toFixed(5) + '%'
    };
    return (
      <div className="duration">
        <div style={style} className="elapsed">
        </div>
      </div>
    );
  }
});

export default Duration;
