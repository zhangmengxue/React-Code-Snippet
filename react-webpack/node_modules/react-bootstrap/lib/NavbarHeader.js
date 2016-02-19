'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var NavbarHeader = _react2['default'].createClass({
  displayName: 'NavbarHeader',

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['children']);

    var _context$$bs_navbar_bsClass = this.context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;

    return _react2['default'].createElement(
      'div',
      { className: _utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'header') },
      children
    );
  }
});

exports['default'] = NavbarHeader;
module.exports = exports['default'];