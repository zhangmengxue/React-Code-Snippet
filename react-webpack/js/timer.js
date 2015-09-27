import React from 'react';

let Timer = React.createClass({
  //初始化状态变量
  getInitialState(){
    return {elapsed: 0};
  },
  //当组件在页面上渲染完成之后调用
  componentDidMount(){
    this.timer = setInterval(this.tick,50);
  },
  //当组件刚刚从页面中移除或销毁时调用
  componentWillUnmount(){
    clearInterval(this.timer);
  },
  tick(){
    //每50ms调用，更新计数器，调用setState函数可以使组件重新渲染
    this.setState({
      elapsed: new Date() - this.props.start
    })
  },
  render(){
    var elapsed = Math.round(this.state.elapsed/100);
    var seconds = (elapsed/10).toFixed(1);
    return(
        <p className="timer">This example was started <b>{seconds} seconds</b> ago.</p>
    );
  }
});

export default Timer;
