import React from 'react';

class Duration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0
    };
  }

  tick() {
    this.setState({ elapsed: (Date.now() - this.props.startedAt) });
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let width = (this.state.elapsed / this.props.trackDuration) * 100;
    let style = {
      width: width.toFixed(5) + '%'
    };
    return (
      <div className="duration">
        <div style={style} className="elapsed">
        </div>
      </div>
    );
  }
};

export default Duration;
