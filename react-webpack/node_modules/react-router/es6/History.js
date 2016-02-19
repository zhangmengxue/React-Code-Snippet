'use strict';

import { history } from './PropTypes';

/**
 * A mixin that adds the "history" instance variable to components.
 */
var History = {

  contextTypes: {
    history: history
  },

  componentWillMount: function componentWillMount() {
    this.history = this.context.history;
  }

};

export default History;