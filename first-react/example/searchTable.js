/** @jsx React.DOM */

//table表头
var ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

//table表内容
var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

//组成内容展示的table
var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
              return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
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

//跟table联动的搜索框
var SearchBar = React.createClass({
    handleChange:function(){
      this.props.onUserInput(
        this.refs.filterTextInput.getDOMNode().value,
        this.refs.inStockOnlyInput.getDOMNode().checked
      );
    },
    render: function() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange}/>
                    {' '}
                    filter
                </p>
            </form>
        );
    }
});

//导出构建的整个应用
module.exports = React.createClass({
    getInitialState:function(){
      return{
        filterText:'',
        isStockOnly:false
      };
    },
    handleUserInput:function(filterText,inStockOnly){
      this.setState({
        filterText:filterText,
        inStockOnly:inStockOnly
      });
    },
    render: function() {
        return (
            <div>
                <SearchBar
                    filterText = {this.state.filterText}
                    isStockOnly = {this.state.isStockOnly}
                    onUserInput = {this.handleUserInput} />
                <ProductTable
                    products = {this.props.products}
                    filterText = {this.state.filterText}
                    isStockOnly = {this.state.isStockOnly}/>
            </div>
        );
    }
});


