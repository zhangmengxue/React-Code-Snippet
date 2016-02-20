import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import routes and pass them into <Router/>
import route from './modules/routes'

render(
  <Router routes={route} history={browserHistory}/>,
  document.getElementById('app')
)
