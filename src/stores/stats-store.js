var Reflux = require('reflux'),
    Actions = require('./../actions/actions.js'),
    statsStore;

statsStore = Reflux.createStore({
    listenables: Actions,

    onLoadCompleted: function(log) {
        this.trigger(log);
    }
});

module.exports = statsStore;
