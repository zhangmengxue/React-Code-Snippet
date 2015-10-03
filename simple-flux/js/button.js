import React from 'react';
import ListStore from '../store/ListStore.js';
import ListActions from '../action/ListActions.js';

let MyButton = React.createClass({
  createNewItem(evt) {
    ListActions.add({ name: 'Marco' });
  },

  componentDidMount() {
    ListStore.bind( 'change', this.listChanged );
  },

  componentWillUnmount() {
    ListStore.unbind( 'change', this.listChanged );
  },

  listChanged() {
    // Since the list changed, trigger a new render.
    this.forceUpdate();
  },

  render() {
    // Remember, ListStore is global!
    // There's no need to pass it around
    var items = ListStore.getAll();

    // Build list items markup by looping
    // over the entire list
    var itemHtml = items.map( function( listItem ) {
      // "key" is important, should be a unique
      // identifier for each list item
      return <li key={ listItem.id }>
        { listItem.name }
      </li>;
    });

    return (<div>
      <ul>{ itemHtml }</ul>
      <button onClick={ this.createNewItem }>New Item</button>
    </div>);
  }
});

module.exports = MyButton;
