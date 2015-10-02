/* global kendo */

var React = require('react');
var _ = require('lodash');

var Grid = {
  /**
   * @param group draggable group
   * @param options
   */
  enableDraggableRows: function (group, options) { 
    this.getWidget().table.kendoDraggable(_.defaults(options || { }, {
      filter: 'tbody > tr',
      group: group,
      cursorOffset: {
        top: 0,
        left: 0
      },  
      hint: function (e) {
        // XXX clean up
        return $('<div class="k-grid k-widget"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
      },
      dragend: function (e) {
        if (e.sender.dropped) {
          this.enableDraggableRows(group, options);
        }
      }.bind(this)
    }));
  }
};

module.exports = Grid;
