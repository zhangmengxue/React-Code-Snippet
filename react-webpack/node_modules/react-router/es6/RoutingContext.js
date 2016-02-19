'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import invariant from 'invariant';
import React, { Component } from 'react';
import { isReactChildren } from './RouteUtils';
import getRouteParams from './getRouteParams';

var _React$PropTypes = React.PropTypes;
var array = _React$PropTypes.array;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;

/**
 * A <RoutingContext> renders the component tree for a given router state
 * and sets the history object and the current location in context.
 */

var RoutingContext = (function (_Component) {
  _inherits(RoutingContext, _Component);

  function RoutingContext() {
    _classCallCheck(this, RoutingContext);

    _Component.apply(this, arguments);
  }

  RoutingContext.prototype.getChildContext = function getChildContext() {
    var _props = this.props;
    var history = _props.history;
    var location = _props.location;

    return { history: history, location: location };
  };

  RoutingContext.prototype.createElement = function createElement(component, props) {
    return component == null ? null : this.props.createElement(component, props);
  };

  RoutingContext.prototype.render = function render() {
    var _this = this;

    var _props2 = this.props;
    var history = _props2.history;
    var location = _props2.location;
    var routes = _props2.routes;
    var params = _props2.params;
    var components = _props2.components;

    var element = null;

    if (components) {
      element = components.reduceRight(function (element, components, index) {
        if (components == null) return element; // Don't create new children; use the grandchildren.

        var route = routes[index];
        var routeParams = getRouteParams(route, params);
        var props = {
          history: history,
          location: location,
          params: params,
          route: route,
          routeParams: routeParams,
          routes: routes
        };

        if (isReactChildren(element)) {
          props.children = element;
        } else if (element) {
          for (var prop in element) {
            if (element.hasOwnProperty(prop)) props[prop] = element[prop];
          }
        }

        if (typeof components === 'object') {
          var elements = {};

          for (var key in components) {
            if (components.hasOwnProperty(key)) {
              // Pass through the key as a prop to createElement to allow
              // custom createElement functions to know which named component
              // they're rendering, for e.g. matching up to fetched data.
              elements[key] = _this.createElement(components[key], _extends({
                key: key }, props));
            }
          }

          return elements;
        }

        return _this.createElement(components, props);
      }, element);
    }

    !(element === null || element === false || React.isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'The root route must render a single element') : invariant(false) : undefined;

    return element;
  };

  return RoutingContext;
})(Component);

RoutingContext.propTypes = {
  history: object.isRequired,
  createElement: func.isRequired,
  location: object.isRequired,
  routes: array.isRequired,
  params: object.isRequired,
  components: array.isRequired
};

RoutingContext.defaultProps = {
  createElement: React.createElement
};

RoutingContext.childContextTypes = {
  history: object.isRequired,
  location: object.isRequired
};

export default RoutingContext;