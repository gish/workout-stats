var Reflux = require('reflux'),
    Actions = require('./../actions/actions.js'),
    stats;

var statsStore = Reflux.createStore({
    listenables: Actions,
    onLoadCompleted: function(data) {
        stats = data;
        this.trigger(stats);
    }
});

module.exports = statsStore;
