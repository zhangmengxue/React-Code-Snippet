/* global kendo */

var React = require('react');
var _ = require('lodash');
var reactTags = _.keys(React.DOM);

function mountKendoWidget (component, widget) {
  component.$elem[widget](component.props.options);
  return component.$elem.data(widget);
}

/**
 * Use for all Kendo objects that inherit from kendo.ui.Widget
 *
 * @param widget e.g. 'kendoGrid' for Grid
 */
var KendoWidgetMixin = function (widget) {
  return {

    propTypes: {
      options: React.PropTypes.object,
      debug: React.PropTypes.bool,
      tag: React.PropTypes.oneOf(reactTags).isRequired
    },

    getDefaultProps: function () {
      return {
        options: { },
        debug: false,
        reactive: false,
        tag: 'div'
      };
    },

    componentWillMount: function () {
      if (this.props.debug) console.log('willMount kendo widget', widget, '...');
    },

    /**
     * Initialize Kendo component
     */
    componentDidMount: function () {
      if (this.props.debug) console.log('kendo widget mounting... ', widget);

      this.elem = React.findDOMNode(this);
      this.$elem = $(this.elem);
      this.$widget = mountKendoWidget(this, widget);

      if (this.props.debug) console.log('kendo widget mounted:', widget, ', widget=', this.$widget);
      if (this.props.debug) console.log('elem=', this.elem);
      if (this.props.debug) console.log('$elem=', this.$elem);
    },

    componentWillUpdate: function () {
      if (this.props.debug) console.log('willUpdate kendo widget', widget, '...');
    },

    /**
     * Pass updated options into kendo widget
     */
    componentDidUpdate: function () {
      if (this.props.debug) console.log('didUpdate kendo widget', widget);
      if (this.props.debug) console.log('new options:', this.props.options);

      if (!this.props.reactive) return;

      if (this.props.debug) console.log('[', widget, '] refreshing "reactive" widget...');

      this.$widget.unbind();
      if (this.$widget.element) {
        kendo.destroy(this.$widget);
      }
      if (this.$widget.dataSource) {
        this.$widget.dataSource.unbind('change', this.$widget._refreshHandler);
        this.$widget.dataSource.unbind('error', this.$widget._errorHandler);
      }

      this.$elem.empty();
      this.$widget = mountKendoWidget(this, widget);
    },

    /**
     * Destroy kendo widget
     */
    componentWillUnmount: function () {
      if (this.props.debug) console.log('unmounting kendo widget', widget, '...');

      this.$widget.unbind();
      if (this.$widget.element) {
        kendo.destroy(this.$widget);
      }

      if (this.$widget.dataSource) {
        this.$widget.dataSource.unbind('change', this.$widget._refreshHandler);
        this.$widget.dataSource.unbind('error', this.$widget._errorHandler);
      }

      if (this.props.debug) console.log('kendo widget unmounted:', widget);
    },

    /**
     * Accessor function for the Kendo Widget object.
     */
    getWidget: function () {
      return this.$widget;
    },

    getElement: function () {
      return this.$elem;
    },

    /**
     * Default Kendo widget renderer
     */
    render: function () {
      var other = _.omit(this.props, [ 'options', 'children', 'tag' ]);
      return React.DOM[this.props.tag](other, this.props.children);
    }
  };
};

module.exports = KendoWidgetMixin;
