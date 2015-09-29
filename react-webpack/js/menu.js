import React from 'react';

let Menu = React.createClass({
  getInitialState(){
    return {focused:0};
  },
  clicked(index){
    this.setState({focused:index});
  },
  render(){
    var self = this;

    return (
      <div>
        <ul>
          {
            this.props.items.map(function(item,index){
              var style="";
              if(self.state.focused == index){
                style="focused";
              }
              //bind方法使index在clicked函数中可见
              return <li className={style} onClick={self.clicked.bind(self,index)}>{item}</li>;
            })
          }
        </ul>
        <p>Selected:{this.props.items[self.state.focused]}</p>
      </div>
    );
  }
});

export default Menu
