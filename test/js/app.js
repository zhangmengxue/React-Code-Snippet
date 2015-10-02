/*开始我们的React+Webpack+ES6的Hello World!*/
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
