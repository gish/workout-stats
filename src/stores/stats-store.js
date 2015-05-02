var Reflux = require('reflux'),
    Actions = require('./../actions/actions.js'),
    datejs = require('datejs'),
    statsStore;

statsStore = Reflux.createStore({
    listenables: Actions,

    getCached: function() {
        var cachedLog = window.localStorage.getItem('log'),
            log = null;

        if (cachedLog) {
            log = this.transformLogDate(JSON.parse(cachedLog));
        }

        return log;
    },

    saveCached: function(log) {
        var cachedLog = JSON.stringify(log);

        window.localStorage.setItem('log', cachedLog);
    },

    transformLogDate: function(log) {
        return log.map(function(entry) {
            entry.date = Date.parse(entry.date);

            return entry;
        });
    },

    onLoadCompleted: function(log) {
        var transformedLog = this.transformLogDate(log);
        this.saveCached(log);
        this.trigger(log);
    }
});

module.exports = statsStore;
