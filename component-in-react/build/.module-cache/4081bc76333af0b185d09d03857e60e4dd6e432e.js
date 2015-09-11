//数据分类表头
var ProductCategoryRow = React.createClass({displayName: "ProductCategoryRow",
  render:function(){
    return (
      React.createElement("tr", null, React.createElement("th", {colSpan: "2"}, this.props.category))
    );
  }
});
//数据表内容
//显示获取到的每个item的名字和价格，如果product的stocked字段false的话名字标红
var ProductRow = React.createClass({displayName: "ProductRow",
  render:function(){
    var name = this.props.product.stocked ?
        this.props.product.name :
        React.createElement("span", {style: "{{color:'red'}}"}, this.props.product.name);
    return(
      React.createElement("tr", null, 
        React.createElement("td", null, name), 
        React.createElement("td", null, this.props.product.price)
      )
    );
  }
});

//由数据表头组件和数据表内容组件组成数据表的table结构
var ProductTable = React.createClass({displayName: "ProductTable",
  render:function(){
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product){
      if(product.category !== lastCategory){
        //先push进去分类表头
        rows.push(React.createElement(ProductCategoryRow, {category: product.category, key: product.category}));
      }
      //再push进去数据表内容
      rows.push(React.createElement(ProductRow, {product: product, key: product.name}));
      lastCategory = product.category;
    });
    //组成数据表头返回
    return (
      React.createElement("table", null, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Name"), 
            React.createElement("th", null, "Price")
          )
        ), 
        React.createElement("tbody", null, rows)
      )
    );
  }
});

//搜索组件
var SearchBar = React.createClass({displayName: "SearchBar",
  render:function(){
    return (
        React.createElement("form", null, 
          React.createElement("input", {type: "text", placeholder: "Search...."}), 
          React.createElement("p", null, React.createElement("input", {type: "checkbox"}), " only support products instock")
        )
    );
  }
});

//通过搜索框过滤数据表
var FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
  render:function(){
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, null), 
        React.createElement(ProductTable, {products: this.props.products})
      )
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

React.render(React.createElement(FilterableProductTable, {products: PRODUCTS}),document.body);


