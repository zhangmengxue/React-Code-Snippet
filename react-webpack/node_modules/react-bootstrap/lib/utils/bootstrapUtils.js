'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _styleMaps = require('../styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function curry(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var last = args[args.length - 1];
    if (typeof last === 'function') {
      return fn.apply(undefined, args);
    }
    return function (Component) {
      return fn.apply(undefined, args.concat([Component]));
    };
  };
}

function prefix(props, variant) {
  if (props === undefined) props = {};

  !(props.bsClass || '').trim() ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'A `bsClass` prop is required for this component') : _invariant2['default'](false) : undefined;
  return props.bsClass + (variant ? '-' + variant : '');
}

var bsClass = curry(function (defaultClass, Component) {
  var propTypes = Component.propTypes || (Component.propTypes = {});
  var defaultProps = Component.defaultProps || (Component.defaultProps = {});

  propTypes.bsClass = _react.PropTypes.string;
  defaultProps.bsClass = defaultClass;

  return Component;
});

exports.bsClass = bsClass;
var bsStyles = curry(function (styles, defaultStyle, Component) {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  var existing = Component.STYLES || [];
  var propTypes = Component.propTypes || {};

  styles.forEach(function (style) {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  var propType = _react.PropTypes.oneOf(existing);

  // expose the values on the propType function for documentation
  Component.STYLES = propType._values = existing;

  Component.propTypes = _extends({}, propTypes, {
    bsStyle: propType
  });

  if (defaultStyle !== undefined) {
    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsStyle = defaultStyle;
  }

  return Component;
});

exports.bsStyles = bsStyles;
var bsSizes = curry(function (sizes, defaultSize, Component) {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  var existing = Component.SIZES || [];
  var propTypes = Component.propTypes || {};

  sizes.forEach(function (size) {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });

  var values = existing.reduce(function (result, size) {
    if (_styleMaps2['default'].SIZES[size] && _styleMaps2['default'].SIZES[size] !== size) {
      result.push(_styleMaps2['default'].SIZES[size]);
    }
    return result.concat(size);
  }, []);

  var propType = _react.PropTypes.oneOf(values);

  propType._values = values;

  // expose the values on the propType function for documentation
  Component.SIZES = existing;

  Component.propTypes = _extends({}, propTypes, {
    bsSize: propType
  });

  if (defaultSize !== undefined) {
    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsSize = defaultSize;
  }

  return Component;
});

exports.bsSizes = bsSizes;
exports['default'] = {

  prefix: prefix,

  getClassSet: function getClassSet(props) {
    var classes = {};
    var bsClassName = prefix(props);

    if (bsClassName) {
      var bsSize = undefined;

      classes[bsClassName] = true;

      if (props.bsSize) {
        bsSize = _styleMaps2['default'].SIZES[props.bsSize] || bsSize;
      }

      if (bsSize) {
        classes[prefix(props, bsSize)] = true;
      }

      if (props.bsStyle) {
        if (props.bsStyle.indexOf(prefix(props)) === 0) {
          process.env.NODE_ENV !== 'production' ? _warning2['default'](false, // small migration convenience, since the old method required manual prefixing
          'bsStyle will automatically prefix custom values with the bsClass, so there is no ' + 'need to append it manually. (bsStyle: ' + props.bsStyle + ', bsClass: ' + prefix(props) + ')') : undefined;
          classes[props.bsStyle] = true;
        } else {
          classes[prefix(props, props.bsStyle)] = true;
        }
      }
    }

    return classes;
  },

  /**
   * Add a style variant to a Component. Mutates the propTypes of the component
   * in order to validate the new variant.
   */
  addStyle: function addStyle(Component, styleVariant) {
    bsStyles(styleVariant, Component);
  }
};
var _curry = curry;
exports._curry = _curry;