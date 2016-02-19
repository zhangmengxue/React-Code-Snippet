import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Link, Route } from 'react-router';

import HelloHandler from './hello.js';
// import Forms from './form.js';
import Timer from './timer.js';
import Menu from './menu.js';

let App = React.createClass({
  render() {
    return (
      <div className="nav">
        <Link to="app" className="homelink">Home  </Link>
        <Link to="hello" className="hellolink">Say Hello</Link>
        <RouteHandler/>
      </div>
    );
  }
});

let routes = (
    <Route path="app" component={App}>
      <Route path="hello" component={HelloHandler}/>
    </Route>
);

render(<Router routes={routes} />, document.getElementById('content'));







