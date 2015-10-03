var ListStore = {
  items : [],
  getAll:function(){
    return this.items;
  }
};

var MicroEvent = require('../lib/microevent.js');
MicroEvent.mixin(ListStore);

module.exports = ListStore;
