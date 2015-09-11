//数据分类表头
var ProductCategoryRow = React.createClass({
  render:function(){
    return (
      <tr><th colSpan="2">{this.props.category}</th></tr>
    );
  }
});
//数据表内容
//显示获取到的每个item的名字和价格，如果product的stocked字段false的话名字标红
var ProductRow = React.createClass({
  render:function(){
    var name = this.props.product.stocked ?
        this.props.product.name :
        <span style="{{color:'red'}}">{this.props.product.name}</span>;
    return(
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

//由数据表头组件和数据表内容组件组成数据表的table结构
var ProductTable = React.createClass({
  render:function(){
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product){
      if(product.category !== lastCategory){
        //先push进去分类表头
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      //再push进去数据表内容
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    //组成数据表头返回
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

//搜索组件
var SearchBar = React.createClass({
  render:function(){
    return (
        <form>
          <input  type="text" placeholder="Search...."/>
          <p><input  type="checkbox"/> only support products instock</p>
        </form>
    );
  }
});

//通过搜索框过滤数据表
var FilterableProductTable = React.createClass({
  render:function(){
    return (
      <div>
        <SearchBar />
        <ProductTable products = {this.props.products} />
      </div>
    );
  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

React.render(<FilterableProductTable products = {PRODUCTS} />,document.getElementById('#example'));


