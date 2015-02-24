import React from 'react';
import config from 'config';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import _ from 'lodash';
import request from 'superagent';

/*
 * TODO:
 * How to fetch spotify info. Maybe via store? Don't wanna make to make calls to spotify api.
 * How to search and enque.
 * Everything goes via firebase!!
 */

/*
var trackId = currentTrack.split(':')[2];
request.get('https://api.spotify.com/v1/tracks/' + trackId, function(res) {
});
*/
/*
var Search = React.createClass({
  render() {
    return (
      <form>
        <div className="form-group">
          <input type="search" className="form-control" placeholder="Search" />
        </div>
      </form>
    );
  }
});
*/

var CurrentTrack = React.createClass({
  componentDidUpdate() {
    console.log("did update");
    console.log(this.props.track);
  },
  render() {
    return (
      <div>
      </div>
    );
  }
});

var App = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState() {
    return {
      data: {}
    };
  },

  componentWillMount() {
    var ref = new Firebase(config.FIREBASE_URL);
    this.bindAsArray(ref, "data");
  },

  render() {
    return (
      <div className="container">
        <header>
          <Search />
        </header>
        <main>
          <CurrentTrack track={this.state.data[0]} />
        </main>
      </div>
    );
  }
});

React.render(<App />, document.body);
