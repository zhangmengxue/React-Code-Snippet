'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var Nav = (function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav() {
    _classCallCheck(this, Nav);

    _React$Component.apply(this, arguments);
  }

  Nav.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var ulClassName = _props.ulClassName;
    var id = _props.id;
    var ulId = _props.ulId;

    var isNavbar = this.props.navbar != null ? this.props.navbar : this.context.$bs_navbar;
    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'stacked')] = this.props.stacked;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'justified')] = this.props.justified;

    if (isNavbar) {
      var bsClass = this.context.$bs_navbar_bsClass || 'navbar';
      var navbarRight = this.props.right != null ? this.props.right : this.props.pullRight;

      classes[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'nav')] = true;
      classes[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'right')] = navbarRight;
      classes[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'left')] = this.props.pullLeft;
    } else {
      classes['pull-right'] = this.props.pullRight;
      classes['pull-left'] = this.props.pullLeft;
    }

    var list = _react2['default'].createElement(
      'ul',
      _extends({ ref: 'ul'
      }, this.props, {
        id: ulId || id,
        role: this.props.bsStyle === 'tabs' ? 'tablist' : null,
        className: _classnames2['default'](className, ulClassName, classes)
      }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem, this)
    );

    // TODO remove in 0.29
    if (this.context.$bs_deprecated_navbar && this.props.collapsible) {
      list = _react2['default'].createElement(
        _Collapse2['default'],
        {
          'in': this.props.expanded,
          className: isNavbar ? 'navbar-collapse' : void 0
        },
        _react2['default'].createElement(
          'div',
          null,
          list
        )
      );
    }

    return list;
  };

  Nav.prototype.getChildActiveProp = function getChildActiveProp(child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  };

  Nav.prototype.renderNavItem = function renderNavItem(child, index) {
    return _react.cloneElement(child, {
      role: this.props.bsStyle === 'tabs' ? 'tab' : null,
      active: this.getChildActiveProp(child),
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      key: child.key ? child.key : index,
      navItem: true
    });
  };

  return Nav;
})(_react2['default'].Component);

Nav.propTypes = {
  activeHref: _react2['default'].PropTypes.string,
  activeKey: _react2['default'].PropTypes.any,

  stacked: _react2['default'].PropTypes.bool,
  justified: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (_ref) {
    var justified = _ref.justified;
    var navbar = _ref.navbar;
    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
  }),
  onSelect: _react2['default'].PropTypes.func,

  /**
   * CSS classes for the wrapper `nav` element
   */
  className: _react2['default'].PropTypes.string,
  /**
   * HTML id for the wrapper `nav` element
   */
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  /**
   * CSS classes for the inner `ul` element
   *
   * @deprecated
   */
  ulClassName: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.string, 'The wrapping `<nav>` has been removed you can use `className` now'),
  /**
   * HTML id for the inner `ul` element
   *
   * @deprecated
   */

  ulId: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.string, 'The wrapping `<nav>` has been removed you can use `id` now'),

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: _react2['default'].PropTypes.bool,
  eventKey: _react2['default'].PropTypes.any,
  pullRight: _react2['default'].PropTypes.bool,
  pullLeft: _react2['default'].PropTypes.bool,

  right: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use the `pullRight` prop instead'),

  /**
   * @private
   */
  expanded: _react2['default'].PropTypes.bool,

  /**
   * @private
   */
  collapsible: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use `Navbar.Collapse` instead, to create collapsible Navbars')
};

Nav.contextTypes = {
  $bs_navbar: _react2['default'].PropTypes.bool,
  $bs_navbar_bsClass: _react2['default'].PropTypes.string,

  $bs_deprecated_navbar: _react2['default'].PropTypes.bool
};

Nav.defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('nav', _utilsBootstrapUtils.bsStyles(['tabs', 'pills'], Nav));
module.exports = exports['default'];