import React from 'react';
import Data from 'react-data-growth';

let Timer = React.createClass({
  render(){
    return(
      <Data num={5000} />
    );
  }
});

export default Timer;
