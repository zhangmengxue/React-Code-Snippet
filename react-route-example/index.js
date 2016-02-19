import React from 'react'
import { render } from 'react-dom'
import App from './modules/App'
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router'
import About from './modules/About'
import Repo from './modules/Repo'
import Home from './modules/Home'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About} />
      <Route path="/repo" component={Repo}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
