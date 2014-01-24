var instance = null;

function Router(app, path) {
    if (instance) {
        return instance;    
    }

    if (!(this instanceof Router)) {
        return new Router(app, path);
    }

    this.app = app; // Express instance
    this.routesPath = path || './routes.js';
    instance = this;
    return this;
};

Router.prototype = {
    start: function() {
        var routesFn = require(this.routesPath);
        routesFn.call(this);
    },

    routeGroup: function(path, fn) {
        var self = this;
        var assigner = {};

        ['get', 'del', 'post', 'put'].forEach(function(method) {
            assigner[method] = function(route, handler) {
                self[method](path + route, handler);
            };
        });

        assigner.routeGroup = function(newPath, fn) {
            self.routeGroup(path + newPath, fn);
        };

        fn.call(null, assigner);
    }
};

['get', 'del', 'post', 'put'].forEach(function(method) {
    Router.prototype[method] = function(route, handler) {
        this.app[method](route, handler);
    };
});

module.exports = Router;