'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import warning from 'warning';
import invariant from 'invariant';
import React, { Component } from 'react';
import { createRouteFromReactElement } from './RouteUtils';
import { component, components, falsy } from './PropTypes';

var func = React.PropTypes.func;

/**
 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
 * a JSX route config.
 */

var IndexRoute = (function (_Component) {
  _inherits(IndexRoute, _Component);

  function IndexRoute() {
    _classCallCheck(this, IndexRoute);

    _Component.apply(this, arguments);
  }

  /* istanbul ignore next: sanity check */

  IndexRoute.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : invariant(false) : undefined;
  };

  return IndexRoute;
})(Component);

IndexRoute.propTypes = {
  path: falsy,
  component: component,
  components: components,
  getComponent: func,
  getComponents: func
};

IndexRoute.createRouteFromReactElement = function (element, parentRoute) {
  /* istanbul ignore else: sanity check */
  if (parentRoute) {
    parentRoute.indexRoute = createRouteFromReactElement(element);
  } else {
    process.env.NODE_ENV !== 'production' ? warning(false, 'An <IndexRoute> does not make sense at the root of your route config') : undefined;
  }
};

export default IndexRoute;