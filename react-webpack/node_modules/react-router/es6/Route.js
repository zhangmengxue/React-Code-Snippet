'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import invariant from 'invariant';
import React, { Component } from 'react';
import { createRouteFromReactElement } from './RouteUtils';
import { component, components } from './PropTypes';

var _React$PropTypes = React.PropTypes;
var string = _React$PropTypes.string;
var func = _React$PropTypes.func;

/**
 * A <Route> is used to declare which components are rendered to the
 * page when the URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is
 * requested, the tree is searched depth-first to find a route whose
 * path matches the URL.  When one is found, all routes in the tree
 * that lead to it are considered "active" and their components are
 * rendered into the DOM, nested in the same order as in the tree.
 */

var Route = (function (_Component) {
  _inherits(Route, _Component);

  function Route() {
    _classCallCheck(this, Route);

    _Component.apply(this, arguments);
  }

  /* istanbul ignore next: sanity check */

  Route.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<Route> elements are for router configuration only and should not be rendered') : invariant(false) : undefined;
  };

  return Route;
})(Component);

Route.createRouteFromReactElement = createRouteFromReactElement;

Route.propTypes = {
  path: string,
  component: component,
  components: components,
  getComponent: func,
  getComponents: func
};

export default Route;