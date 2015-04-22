var Reflux = require('reflux'),
    Actions = require('./../actions/actions.js');

var stats = {
    streak: 5,
    total: 10
};

var statsStore = Reflux.createStore({
    listenables: Actions,
    onLoadCompleted: function() {
        this.trigger(stats);
    }
});

module.exports = statsStore;
