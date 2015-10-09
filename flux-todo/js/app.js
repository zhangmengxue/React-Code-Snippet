/*Hello World!*/
import React from 'react';
import Hello from './hello.js';

let App = React.createClass({
  render(){
    return (
      <Hello />
    );
  }
});

React.render(
  <App />,
  document.body
  )
