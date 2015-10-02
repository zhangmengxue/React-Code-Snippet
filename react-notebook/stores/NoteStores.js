/*用来维护日记的store*/
var Reflux = require('reflux');
var NoteActions = require('../actions/NoteActions');

var _notes = [];

var NoteStores = Reflux.createStore({
  init:function(){
    //在这里监听action并注册回调函数
    this.listenTo(NoteActions.createNote,this.onCreate);
    this.listenTo(NoteActions.editNote,this.onEdit);
  },
  onCreate:function(note){
    //创建新的Note
    _notes.push(note);
    //通过trigger可以更新notes从而更新视图
    this.trigger(_notes);
  },
  onEdit:function(note){
    for(var i=0;i<_notes.length;i++){
      if(_notes[i]._id === note._id){
        _notes[i].text = note.text;
        this.trigger(_notes);
        break;
      }
    }
  },
  //getter for notes
  getNotes:function(){
    return _notes;
  },
  //通过id找到note
  getNote:function(id){
    for(var i=0;i<_notes.length;i++){
      if(_notes[i]._id === id){
        return _notes[i];
      }
    }
  }
});

module.exports = NoteStores;
