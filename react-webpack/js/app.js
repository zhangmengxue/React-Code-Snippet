import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import HelloHandler from './hello.js';
import Forms from './form.js';
import Timer from './timer.js';
import Menu from './menu.js';

let App = React.createClass({
  render() {
    return (
      <div className="nav">
        <Link to="app" className="homelink">Home  </Link>
        <Link to="hello" className="hellolink">  Say Hello</Link>
        <Link to="form" className="formlink">  This is a form with bootstrap</Link>
        {/* this is the importTant part */}
        <RouteHandler/>
        <Timer start={Date.now()} />
        <Menu items={['Home','About','Contect']} />
      </div>
    );

      <div>Hello world!</div>
    );  }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="hello" path="/hello" handler={HelloHandler}/>
    <Route name="form" path="/form" handler={Forms}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});

