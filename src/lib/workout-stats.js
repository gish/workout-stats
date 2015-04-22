var getLog = require('./getlog'),
    stats = require('./stats'),
    Promise = require('node-promise').Promise,
    getLongestStreak,
    getCurrentStreak,
    getNumSessions,
    getNumDays,
    getStats,
    MS_PER_DAY = 86400 * 1e3;

getLongestStreak = function(log) {
    var days = log.map(function(entry) {
            return Math.floor(entry.date.getTime() / MS_PER_DAY);
        });
    return stats.longestStreak(days);
};

getCurrentStreak = function(log) {
    var days = log.map(function(entry) {
            return Math.floor(entry.date.getTime() / MS_PER_DAY);
        }),
        today = Math.floor((new Date()).getTime() / MS_PER_DAY),
        streaks = stats.streaks(days),
        currentStreak = streaks.reduce(function(current, value) {
            if (value[0] === today) {
                return value[1];
            }
            return current;
        }, 0);
    return currentStreak;
};

getNumSessions = function(log) {
    return log.length;
};

getNumDays = function(log) {
    var firstDay,
        lastDay,
        getDay = function(logEntry) {
            return Math.floor(logEntry.date.getTime() / MS_PER_DAY);
        };
    firstDay = getDay(log[0]);
    lastDay = getDay(log[log.length - 1]);

    return lastDay - firstDay;
};

getStats = function(secret) {
    var promise = new Promise();

    getLog(secret).then(function(log) {
        promise.resolve({
            longestStreak: getLongestStreak(log),
            currentStreak: getCurrentStreak(log),
            numSessions: getNumSessions(log),
            numDays: getNumDays(log)
        });
    });

    return promise;
};
