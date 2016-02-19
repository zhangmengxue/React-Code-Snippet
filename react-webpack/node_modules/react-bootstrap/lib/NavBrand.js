'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _NavbarBrand = require('./NavbarBrand');

var _NavbarBrand2 = _interopRequireDefault(_NavbarBrand);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

exports['default'] = _utilsDeprecationWarning2['default'].wrapper(_NavbarBrand2['default'], {
  message: 'The `NavBrand` component has been renamed to: `NavbarBrand`. ' + 'Please use that component instead; this alias will be removed in an upcoming release'
});
module.exports = exports['default'];