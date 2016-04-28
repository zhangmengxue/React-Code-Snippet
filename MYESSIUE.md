### 在开发过程中遇到的问题和要点list
——--------------------

- setState之后不一定会立即访问到已经被改变的state，可以把它想成异步的；
 例：
```
this.setState({
  canvas: canvas,
  g: g,
  percent: percent
}, function() {
  that.drawBackGround();
  that.draw();
});
```
 <https://facebook.github.io/react/docs/component-specs.html>

- render 函数中不应该修改组件的state，否则会报错。只读。

- lifecircle visual picture  <http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/>

- React.createClass vs extends React.Component(ES6 && facebook recomended) <https://toddmotto.com/react-create-class-versus-component/>

- Deveopment a React Component Generator <https://github.com/kadirahq/react-cdk>  <https://github.com/kadirahq/react-storybook>
