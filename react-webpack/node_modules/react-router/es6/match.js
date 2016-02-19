'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import invariant from 'invariant';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import useBasename from 'history/lib/useBasename';
import { createRoutes } from './RouteUtils';
import useRoutes from './useRoutes';

var createHistory = useRoutes(useBasename(createMemoryHistory));

/**
 * A high-level API to be used for server-side rendering.
 *
 * This function matches a location to a set of routes and calls
 * callback(error, redirectLocation, renderProps) when finished.
 *
 * Note: You probably don't want to use this in a browser. Use
 * the history.listen API instead.
 */
function match(_ref, callback) {
  var routes = _ref.routes;
  var location = _ref.location;
  var parseQueryString = _ref.parseQueryString;
  var stringifyQuery = _ref.stringifyQuery;
  var basename = _ref.basename;

  !location ? process.env.NODE_ENV !== 'production' ? invariant(false, 'match needs a location') : invariant(false) : undefined;

  var history = createHistory({
    routes: createRoutes(routes),
    parseQueryString: parseQueryString,
    stringifyQuery: stringifyQuery,
    basename: basename
  });

  // Allow match({ location: '/the/path', ... })
  if (typeof location === 'string') location = history.createLocation(location);

  history.match(location, function (error, redirectLocation, nextState) {
    callback(error, redirectLocation, nextState && _extends({}, nextState, { history: history }));
  });
}

export default match;