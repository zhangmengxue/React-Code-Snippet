'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var NavbarToggle = _react2['default'].createClass({
  displayName: 'NavbarToggle',

  propTypes: {
    /**
     * The toggle content, if left empty it will render the default toggle (seen above).
     */
    children: _react.PropTypes.node
  },

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string,
    $bs_navbar_onToggle: _react.PropTypes.func
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['children']);

    var _context = this.context;
    var _context$$bs_navbar_bsClass = _context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;
    var onToggle = _context.$bs_navbar_onToggle;

    return _react2['default'].createElement(
      'button',
      { type: 'button',
        onClick: onToggle,
        className: _utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'toggle')
      },
      children || [_react2['default'].createElement(
        'span',
        { className: 'sr-only', key: 0 },
        'Toggle navigation'
      ), _react2['default'].createElement('span', { className: 'icon-bar', key: 1 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 2 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 3 })]
    );
  }
});

exports['default'] = NavbarToggle;
module.exports = exports['default'];