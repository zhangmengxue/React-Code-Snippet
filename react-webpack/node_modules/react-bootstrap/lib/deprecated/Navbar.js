'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _NavBrand = require('../NavBrand');

var _NavBrand2 = _interopRequireDefault(_NavBrand);

var _utilsBootstrapUtils = require('../utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('../styleMaps');

var _utilsCreateChainedFunction = require('../utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsValidComponentChildren = require('../utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var Navbar = _react2['default'].createClass({
  displayName: 'Navbar',

  propTypes: {
    fixedTop: _react2['default'].PropTypes.bool,
    fixedBottom: _react2['default'].PropTypes.bool,
    staticTop: _react2['default'].PropTypes.bool,
    inverse: _react2['default'].PropTypes.bool,
    fluid: _react2['default'].PropTypes.bool,
    role: _react2['default'].PropTypes.string,
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default'],
    brand: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.node, 'Use the `NavBrand` component.'),
    toggleButton: _react2['default'].PropTypes.node,
    toggleNavKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    onToggle: _react2['default'].PropTypes.func,
    navExpanded: _react2['default'].PropTypes.bool,
    defaultNavExpanded: _react2['default'].PropTypes.bool
  },

  // TODO Remove in 0.29
  childContextTypes: {
    $bs_deprecated_navbar: _react2['default'].PropTypes.bool
  },

  getChildContext: function getChildContext() {
    return {
      $bs_deprecated_navbar: true
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      role: 'navigation',
      componentClass: 'nav',
      fixedTop: false,
      fixedBottom: false,
      staticTop: false,
      inverse: false,
      fluid: false,
      defaultNavExpanded: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      navExpanded: this.props.defaultNavExpanded
    };
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleToggle: function handleToggle() {
    if (this.props.onToggle) {
      this._isChanging = true;
      this.props.onToggle();
      this._isChanging = false;
    }

    this.setState({
      navExpanded: !this.state.navExpanded
    });
  },

  isNavExpanded: function isNavExpanded() {
    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
  },

  hasNavBrandChild: function hasNavBrandChild() {
    return _utilsValidComponentChildren2['default'].findValidComponents(this.props.children, function (child) {
      return child.props.bsRole === 'brand';
    }).length > 0;
  },

  render: function render() {
    var _props = this.props;
    var brand = _props.brand;
    var toggleButton = _props.toggleButton;
    var toggleNavKey = _props.toggleNavKey;
    var fixedTop = _props.fixedTop;
    var fixedBottom = _props.fixedBottom;
    var staticTop = _props.staticTop;
    var inverse = _props.inverse;
    var ComponentClass = _props.componentClass;
    var fluid = _props.fluid;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['brand', 'toggleButton', 'toggleNavKey', 'fixedTop', 'fixedBottom', 'staticTop', 'inverse', 'componentClass', 'fluid', 'className', 'children']);

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (props.role === undefined && ComponentClass !== 'nav') {
      props.role = 'navigation';
    }

    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'fixed-top')] = this.props.fixedTop;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'fixed-bottom')] = this.props.fixedBottom;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'static-top')] = this.props.staticTop;

    // handle built-in styles manually to provide the convenience `inverse` prop
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, _styleMaps.INVERSE)] = this.props.inverse;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, _styleMaps.DEFAULT)] = !this.props.inverse;

    var showHeader = (brand || toggleButton || toggleNavKey != null) && !this.hasNavBrandChild();

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, props, { className: _classnames2['default'](className, classes) }),
      _react2['default'].createElement(
        _Grid2['default'],
        { fluid: fluid },
        showHeader ? this.renderBrandHeader() : null,
        _utilsValidComponentChildren2['default'].map(children, this.renderChild)
      )
    );
  },

  renderBrandHeader: function renderBrandHeader() {
    var brand = this.props.brand;

    if (brand) {
      brand = _react2['default'].createElement(
        _NavBrand2['default'],
        null,
        brand
      );
    }

    return this.renderHeader(brand);
  },

  renderHeader: function renderHeader(brand) {
    var hasToggle = this.props.toggleButton || this.props.toggleNavKey != null;
    var headerClass = _utilsBootstrapUtils2['default'].prefix(this.props, 'header');

    return _react2['default'].createElement(
      'div',
      { className: headerClass },
      brand,
      hasToggle ? this.renderToggleButton() : null
    );
  },

  renderChild: function renderChild(child, index) {
    var key = child.key != null ? child.key : index;

    if (child.props.bsRole === 'brand') {
      return _react2['default'].cloneElement(this.renderHeader(child), { key: key });
    }

    var toggleNavKey = this.props.toggleNavKey;

    var collapsible = toggleNavKey != null && toggleNavKey === child.props.eventKey;

    return _react2['default'].cloneElement(child, {
      navbar: true,
      collapsible: collapsible,
      expanded: collapsible && this.isNavExpanded(),
      key: key
    });
  },

  renderToggleButton: function renderToggleButton() {
    var toggleButton = this.props.toggleButton;

    var toggleClass = _utilsBootstrapUtils2['default'].prefix(this.props, 'toggle');

    if (_react2['default'].isValidElement(toggleButton)) {
      return _react2['default'].cloneElement(toggleButton, {
        className: _classnames2['default'](toggleButton.props.className, toggleClass),
        onClick: _utilsCreateChainedFunction2['default'](this.handleToggle, toggleButton.props.onClick)
      });
    }

    var children = undefined;
    if (toggleButton != null) {
      children = toggleButton;
    } else {
      children = [_react2['default'].createElement(
        'span',
        { className: 'sr-only', key: 0 },
        'Toggle navigation'
      ), _react2['default'].createElement('span', { className: 'icon-bar', key: 1 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 2 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 3 })];
    }

    return _react2['default'].createElement(
      'button',
      {
        type: 'button',
        onClick: this.handleToggle,
        className: toggleClass
      },
      children
    );
  }

});

var NAVBAR_STATES = [_styleMaps.DEFAULT, _styleMaps.INVERSE];

exports['default'] = _utilsBootstrapUtils.bsStyles(NAVBAR_STATES, _styleMaps.DEFAULT, _utilsBootstrapUtils.bsClass('navbar', Navbar));
module.exports = exports['default'];