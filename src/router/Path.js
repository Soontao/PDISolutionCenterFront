// library from https://github.com/mtrpcic/pathjs
// author mtrpcic <mike@mtrpcic.net>

const innerHistory = [];

export const Path = {
  'version': "0.8.4",
  'map': function(path) {
    if (Path.routes.defined.hasOwnProperty(path)) {
      return Path.routes.defined[path];
    } else {
      return new Path.core.Route(path);
    }
  },
  'root': function(path) {
    Path.routes.root = path;
  },
  'rescue': function(fn) {
    Path.routes.rescue = fn;
  },
  'history': {
    'initial': {}, // Empty container for "Initial Popstate" checking variables.
    'pushState': function(state, title, path) {
      if (Path.history.supported) {
        Path.dispatch(path);
      } else if (Path.history.fallback) {
        window.location.hash = "#" + path;
      }
    },
    'popState': function(event) {
      var initialPop = !Path.history.initial.popped && location.href == Path.history.initial.URL;
      Path.history.initial.popped = true;
      if (initialPop) { return; }
      Path.dispatch(document.location.pathname);
    },
    'listen': function(fallback) {
      Path.history.supported = !!(window.history && window.history.pushState);
      Path.history.fallback = fallback;

      if (Path.history.supported) {
        Path.history.initial.popped = ('state' in window.history);
        Path.history.initial.URL = location.href;
        window.onpopstate = Path.history.popState;
      } else if (Path.history.fallback) {
        for (var route in Path.routes.defined) {
          if (route.charAt(0) != "#") {
            Path.routes.defined["#" + route] = Path.routes.defined[route];
            Path.routes.defined["#" + route].path = "#" + route;
          }
        }
        Path.listen();
      }
    }
  },
  'match': function(path, parameterized) {
    var params = {}, route = null, possibleRoutes, slice, i, j, compare;

    for (route in Path.routes.defined) {
      if (route !== null && route !== undefined) {
        route = Path.routes.defined[route];
        possibleRoutes = route.partition();
        for (j = 0; j < possibleRoutes.length; j++) {
          slice = possibleRoutes[j];
          compare = path;
          if (slice.search(/:/) > 0) {
            for (i = 0; i < slice.split("/").length; i++) {
              if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")) {
                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
              }
            }
          }
          if (slice === compare) {
            if (parameterized) {
              route.params = params;
            }
            return route;
          }
        }
      }
    }
    return null;
  },
  // eslint-disable-next-line consistent-return
  'dispatch': function(passedRoute) {
    var previousRoute, matchedRoute;
    if (Path.routes.current !== passedRoute) {
      Path.routes.previous = Path.routes.current;
      Path.routes.current = passedRoute;
      matchedRoute = Path.match(passedRoute, true);

      if (Path.routes.previous) {
        previousRoute = Path.match(Path.routes.previous);
        if (previousRoute !== null && previousRoute.doExit !== null) {
          previousRoute.doExit();
        }
      }

      if (matchedRoute !== null) {
        matchedRoute.run(passedRoute);
        return true;
      } else if (Path.routes.rescue !== null) {
        Path.routes.rescue();
      }
    }
  },
  'listen': function() {
    var fn = function() { Path.dispatch(location.hash); };

    if (location.hash === "") {
      if (Path.routes.root !== null) {
        location.hash = Path.routes.root;
      }
    }

    // The 'document.documentMode' checks below ensure that PathJS fires the right events
    // even in IE "Quirks Mode".
    if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
      window.onhashchange = fn;
    } else {
      setInterval(fn, 50);
    }

    if (location.hash !== "") {
      Path.dispatch(location.hash);
    }
  },
  'core': {
    'Route': function(path) {
      this.path = path;
      this.action = null;
      this.doEnter = [];
      this.doExit = null;
      this.params = {};
      Path.routes.defined[path] = this;
    }
  },
  'routes': {
    'current': null,
    'root': null,
    'rescue': null,
    'previous': null,
    'defined': {}
  }
};

Path.core.Route.prototype = {
  'to': function(fn) {
    this.action = fn;
    return this;
  },
  'enter': function(fns) {
    if (fns instanceof Array) {
      this.doEnter = this.doEnter.concat(fns);
    } else {
      this.doEnter.push(fns);
    }
    return this;
  },
  'exit': function(fn) {
    this.doExit = fn;
    return this;
  },
  'partition': function() {
    var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
    while ((text = re.exec(this.path) != undefined)) {
      parts.push(text[1]);
    }
    options.push(this.path.split("(")[0]);
    for (i = 0; i < parts.length; i++) {
      options.push(options[options.length - 1] + parts[i]);
    }
    return options;
  },
  'run': function(nextPath) {

    var isBack = false;

    if (innerHistory.length > 1) {
      var currentPath = innerHistory.pop();
      var previousPath = innerHistory.pop();
      if (previousPath == nextPath) {
        isBack = true;
        innerHistory.push(nextPath);
      } else {
        isBack = false;
        innerHistory.push(previousPath);
        innerHistory.push(currentPath);
        innerHistory.push(nextPath);
      }

    } else {
      innerHistory.push(nextPath);
    }

    var haltExecution = false, i, result;

    if (Path.routes.defined[this.path].hasOwnProperty("do_enter")) {
      if (Path.routes.defined[this.path].do_enter.length > 0) {
        for (i = 0; i < Path.routes.defined[this.path].do_enter.length; i++) {
          result = Path.routes.defined[this.path].do_enter[i].apply(this, null);
          if (result === false) {
            haltExecution = true;
            break;
          }
        }
      }
    }

    if (!haltExecution) {
      Path.routes.defined[this.path].action({ ...this.params, isBack });
    }

  }
};