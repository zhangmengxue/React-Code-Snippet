'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import warning from 'warning';
import invariant from 'invariant';
import React, { Component } from 'react';
import Redirect from './Redirect';
import { falsy } from './PropTypes';

var _React$PropTypes = React.PropTypes;
var string = _React$PropTypes.string;
var object = _React$PropTypes.object;

/**
 * An <IndexRedirect> is used to redirect from an indexRoute.
 */

var IndexRedirect = (function (_Component) {
  _inherits(IndexRedirect, _Component);

  function IndexRedirect() {
    _classCallCheck(this, IndexRedirect);

    _Component.apply(this, arguments);
  }

  /* istanbul ignore next: sanity check */

  IndexRedirect.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : invariant(false) : undefined;
  };

  return IndexRedirect;
})(Component);

IndexRedirect.propTypes = {
  to: string.isRequired,
  query: object,
  state: object,
  onEnter: falsy,
  children: falsy
};

IndexRedirect.createRouteFromReactElement = function (element, parentRoute) {
  /* istanbul ignore else: sanity check */
  if (parentRoute) {
    parentRoute.indexRoute = Redirect.createRouteFromReactElement(element);
  } else {
    process.env.NODE_ENV !== 'production' ? warning(false, 'An <IndexRedirect> does not make sense at the root of your route config') : undefined;
  }
};

export default IndexRedirect;