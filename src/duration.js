import React from 'react';
import { ProgressBar } from 'react-bootstrap';

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
    let percent = (this.state.elapsed / this.props.trackDuration) * 100;
    return (
      <ProgressBar now={percent} label="%(percent)s%" srOnly />
    );
  }
};

export default Duration;
