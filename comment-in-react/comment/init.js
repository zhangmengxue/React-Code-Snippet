/** @jsx React.DOM */
var CommentList = React.createClass({
  render:function(){
    var commentNodes = this.props.data.map(function(comment){
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return(
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var converter = new Showdown.converter();
var Comment = React.createClass({
  render:function(){
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return(
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html:rawMarkup}}/>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit:function(e){
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if(!text || !author){
      return;
    }
    this.props.onCommentSubmit({author:author,text:text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render:function(){
    return(
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your Name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState:function(){
    return {data:[]};
  },
  //CommentBox组件被渲染时自动调用的方法，数据返回成功之后改变state状态使得组件重新渲染数据
  componentDidMount:function(){
    $.ajax({
      url:this.props.url,
      dataType:'json',
      success:function(data){
        this.setState({data:data});
      }.bind(this),
      error:function(xhr,status,err){
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
  },
  //轮训的方法
  // loadCommentsFromServer:function(){
  //   $.ajax({
  //     url:this.props.url,
  //     dataType:'json',
  //     success:function(data){
  //       this.setState({data:data});
  //     }.bind(this),
  //     error:function(xhr,status,err){
  //       console.error(this.props.url,status,err.toString());
  //     }.bind(this)
  //   });
  // },
  // componentDidMoount:function(){
  //   this.loadCommentsFromServer();
  //   setInterval(this.loadCommentsFromServer,this.props.pollInterval);
  // },
  //post请求可能会有一些问题[完整示例在这里](https://github.com/reactjs/react-tutorial)
  handleCommentSubmit:function(comment){
    console.log(JSON.stringify(comment));
     $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render:function(){
    return(
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});


React.render(
  <CommentBox url="test.json"/>,
  document.body
);
