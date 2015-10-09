var _ = require('lodash');
var React = require('react');
var KendoWidgetMixin = require('./KendoWidgetMixin');
var widgetMixins = require('./widgets');
var kendo = global.kendo;

if (!kendo || !kendo.ui) {
  throw new Error('kendo.ui not found');
}

function kendoWidgetName(name) {
  return 'kendo' + name;
}

var KendoWidgets = _.mapValues(kendo.ui, function (widget, name) {
  var mixins = [
    KendoWidgetMixin(kendoWidgetName(name))
  ];
  if (widgetMixins[name]) {
    mixins.push(widgetMixins[name]);
  }
  return React.createClass({
    mixins: mixins
  });
});

module.exports = _.extend(KendoWidgets, {
  Template: require('./KendoTemplate')
});
