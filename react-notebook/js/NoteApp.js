import React from 'react';
import NoteStore from '../stores/NoteStores.js';
import NoteActions from '../actions/NoteActions.js';
/*
                       NoteApp
+-----------------------------------------------------------+
|    NoteListBox                       NoteCreationBox      |
|    +-----------------+          +-------------------+     |
|    |   NoteList      |          |                   |     |
|    |  +----------+   |          |    TextArea       |     |
|    |  |          |   |          |                   |     |
|    |  | +-----+  |   |          |    +--------+     |     |
|    |  | | Note|  |   |          |    |        |     |     |
|    |  | +-----+  |   |          |    |        |     |     |
|    |  |          |   |          |    |        |     |     |
|    |  |  +Note+  |   |          |    |        |     |     |
|    |  |  |    |  |   |          |    |        |     |     |
|    |  |  +-+--+  |   |          |    |        |     |     |
|    |  |    |     |   |          |    +--------+     |     |
|    |  |    |     |   |          |                   |     |
|    |  +----+-----+   |          |                   |     |
|    +-----------------+          +-------------------+     |
+-----------------------------------------------------------+

*/

/*right area start*/
let TextArea = React.createClass({

  getInitialState(){
    return ({noteText:''})
  },

  handleChange(event){
    this.setState({noteText:event.target.value});
  },

  handleSave(){
    this.props.onSave(this.state.noteText,this.props.id);
    if(!this.props.id){
      this.refs.textArea.getDOMNode().value = '';
      this.setState({noteText:''});
    }
  },

  componentWillReceiveProps(nextProps){
    this.setState({
      noteText:nextProps.noteText
    });
    if(!nextProps.id){
      this.refs.textArea.getDOMNode().focus();
    }
  },

  render(){
    return (
      <div>
        <textarea className="form-control" cols="100" rows="20"
                  value={this.state.noteText}
                  onChange={this.handleChange}
                  ref="textArea">
        </textarea>
        <br />
        <input type="button" className="btn btn-success btn-lg" value="Save" onClick={this.handleSave} />
      </div>
    );
  }
});

let NoteCreationBox = React.createClass({

  handleSave(noteText,id){
    if(id){
      NoteActions.editNote({_id:id,text:noteText});
    }else{
      NoteActions.createNote({_id:Date.now(),text:noteText});
    }
  },

  render(){
    var note;
    if(this.props.id){
      note = NoteStore.getNote(this.props.id);
    }
    return (
      <div className="col-md-8">
        <TextArea onSave={this.handleSave} id={this.props.id} noteText={note?note.text:''} />
      </div>
    );
  }

});
/*right area end*/

/*left area start*/
let Note = React.createClass({

  handleEdit(id,event){
    event.preventDefault();
    this.props.onEdit(id);
    this.props.onSelect(id);
  },

  render(){
    var note = this.props.note;
    var title = note.text.length >=20 ? note.text.substring(0,20) : note.text;
    var className = this.props.active ? 'active' : null;
    return (
      <a href="#" className={'list-group-item '+className} onClick={this.handleEdit.bind(null,note._id)}>
      {title}
      </a>
    );
  }
});

let NoteList = React.createClass({

  getInitialState(){
    return {activeNoteId:null}
  },

  setActiveNote(id){
    this.setState({activeNoteId:id});
  },

  render(){
    var self = this;
    var notes = this.props.notes.concat().reverse();
    var noteNodes = notes.map(function(note){
      return (
        <Note  key={note._id}
              active={self.state.activeNoteId === note._id}
              note={note}
              onEdit={self.props.onEdit}
              onSelect={self.setActiveNote}/>
      );
    });
    return (
      <div className="list-group">
        {noteNodes}
      </div>
    );
  }
});

let NoteListBox = React.createClass({

  getInitialState(){
    return {notes:NoteStore.getNotes()}
  },

  onChange(notes){
    this.setState({
      notes:notes
    });
  },

  componentDidMount(){
    this.unsubscribe = NoteStore.listen(this.onChange);
  },

  componentWillUnmount(){
    this.unsubscribe();
  },

  onAdd(event){
    event.preventDefault();
    this.props.onAdd();
    this.refs.noteList.setActiveNote(null);
  },

  render(){
    return (
      <div className="col-md-4">
        <div className="centered"><a href="" onClick={this.onAdd}>Add New</a></div>
        <NoteList ref="noteList" notes={this.state.notes} onEdit={this.props.onEdit} />
      </div>
    );
  }
});

/*left area end*/

let NoteApp = React.createClass({

  getInitialState(){
    return {id:null}
  },

  onEdit(id){
    this.setState({currentlyEdited:id});
  },

  onAdd(){
    this.setState({currentlyEdited:null});
  },

  render(){
    return (
      <div className="container">
        <div className="row header">
          <div className="page-header">
            <h1>React Note App</h1>
          </div>
        </div>
        <div className="row">
            <NoteListBox onEdit={this.onEdit} onAdd={this.onAdd} />
            <NoteCreationBox id={this.state.currentlyEdited} />
        </div>
      </div>
    );
  }
});
export default NoteApp;










