var getLog = require('./getlog'),
    stats = require('./stats'),
    Q = require('q'),
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

getNumByDayOfWeek = function(log) {
    var num = [0, 0, 0, 0, 0, 0, 0];

    log.map(function(entry) {
        var dayOfWeek = entry.date.getDay() - 1;
        if (dayOfWeek === -1) {
            dayOfWeek = num.length - 1;
        }
        num[dayOfWeek]++;
    });

    return num;
};

getStats = function(secret) {
    var deferred = new Q.defer();

    getLog(secret).then(function(log) {
        deferred.resolve({
            longestStreak: getLongestStreak(log),
            currentStreak: getCurrentStreak(log),
            numSessions: getNumSessions(log),
            numDays: getNumDays(log),
            numByDayOfWeek: getNumByDayOfWeek(log)
        });
    });

    return deferred.promise;
};

module.exports = getStats;
