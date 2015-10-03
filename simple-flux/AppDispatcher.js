var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var ListStore = require('./store/ListStore.js');

AppDispatcher.register(function(payload){
  switch(payload.eventName){
    case 'new-item':
      ListStore.items.push(payload.newItem);
      ListStore.trigger('change');
    break;
  }
  return true;
});

module.exports = AppDispatcher;
