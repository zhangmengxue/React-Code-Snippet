import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import About from './About'
import Repo from './Repo'
import Home from './Home'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About} />
      <Route path="/repo" component={Repo}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
