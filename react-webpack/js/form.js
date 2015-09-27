import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import form from 'react-bootstrap/lib/FormGroup';
import ButtonInput from 'react-bootstrap/lib/Button';


const Forms = React.createClass({
  getInitialState() {
    return{
      value:''
    };
  },
  handleChange() {
    this.setState({
      value:this.refs.input.getValue()
    })
  },
  handleClick() {
    console.log('click');
  },
  validationState() {
    let length = this.state.value.length;
    if(length > 10) return 'success';
    else if(length > 5) return 'warning';
    else if(length > 0) return 'error';
  },
  render() {
    return(
      <form className="formwrapper">
         <Input
          type="text"
          className="formInput"
          value={this.state.value}
          label="输入模块名："
          placeholder="Enter Text..."
          ref="input"
          bsStyle={this.validationState()}
          hasFeedback
          groupClassName = "group-class"
          labelClassName = "label-class"
          onChange={this.handleChange} />
          <Input type="radio" label="Kissy" id="tad" name="tad"/>
          <Input type="radio" label="kimi" id="tad" name="tad" />
          <Input type="textarea" label="请输入模块描述:" placeholder="模块描述" />
          <ButtonInput type="reset" value="重置">重置</ButtonInput>
          <ButtonInput type="submit" value="提交" bsStyle="primary" onClick={this.handleClick}>提交</ButtonInput>
      </form>
    );
  }
});

export default Forms;
