/* 新的数据通过actions流入stores，当actions被调用时，Stores监听
 * actions并作出一些反馈
*/
var Reflux = require('reflux');

var NoteActions = Reflux.createActions([
  'createNote',
  'editNote'
]);

module.exports = NoteActions;
