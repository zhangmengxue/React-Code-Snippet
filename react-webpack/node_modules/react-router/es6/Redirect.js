'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import invariant from 'invariant';
import React, { Component } from 'react';
import { createRouteFromReactElement } from './RouteUtils';
import { formatPattern } from './PatternUtils';
import { falsy } from './PropTypes';

var _React$PropTypes = React.PropTypes;
var string = _React$PropTypes.string;
var object = _React$PropTypes.object;

/**
 * A <Redirect> is used to declare another URL path a client should
 * be sent to when they request a given URL.
 *
 * Redirects are placed alongside routes in the route configuration
 * and are traversed in the same manner.
 */

var Redirect = (function (_Component) {
  _inherits(Redirect, _Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    _Component.apply(this, arguments);
  }

  /* istanbul ignore next: sanity check */

  Redirect.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<Redirect> elements are for router configuration only and should not be rendered') : invariant(false) : undefined;
  };

  return Redirect;
})(Component);

Redirect.createRouteFromReactElement = function (element) {
  var route = createRouteFromReactElement(element);

  if (route.from) route.path = route.from;

  route.onEnter = function (nextState, replaceState) {
    var location = nextState.location;
    var params = nextState.params;

    var pathname = undefined;
    if (route.to.charAt(0) === '/') {
      pathname = formatPattern(route.to, params);
    } else if (!route.to) {
      pathname = location.pathname;
    } else {
      var routeIndex = nextState.routes.indexOf(route);
      var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
      var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
      pathname = formatPattern(pattern, params);
    }

    replaceState(route.state || location.state, pathname, route.query || location.query);
  };

  return route;
};

Redirect.getRoutePattern = function (routes, routeIndex) {
  var parentPattern = '';

  for (var i = routeIndex; i >= 0; i--) {
    var route = routes[i];
    var pattern = route.path || '';
    parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

    if (pattern.indexOf('/') === 0) break;
  }

  return '/' + parentPattern;
};

Redirect.propTypes = {
  path: string,
  from: string, // Alias for path
  to: string.isRequired,
  query: object,
  state: object,
  onEnter: falsy,
  children: falsy
};

export default Redirect;