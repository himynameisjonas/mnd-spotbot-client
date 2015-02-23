import React from 'react';

var App = React.createClass({
  render() {
    return (
      <div>
        <h1>Hello from React</h1>
      </div>
    );
  }
});

React.render(<App />, document.body);
