import React from 'react';
import NoteApp from './NoteApp.js';

let App = React.createClass({
  render(){
    return (
      <NoteApp />
    );
  }
});

React.render(
  <App />,
  document.body
  )
