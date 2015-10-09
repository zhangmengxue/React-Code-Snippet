var _ = require('lodash');
var React = require('react');

var KendoTemplate = function (component) {
  return React.renderToStaticMarkup(component);
};

module.exports = KendoTemplate;
