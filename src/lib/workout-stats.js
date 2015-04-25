var getLog = require('./getlog'),
    stats = require('./stats'),
    getLongestStreak,
    getCurrentStreak,
    getNumSessions,
    getNumDays,
    getStats,
    getNumByDayOfWeek,
    MS_PER_DAY = 86400 * 1e3;

getLongestStreak = function(log) {
    var days = log.map(function(entry) {
            return Math.floor(entry.date.getTime() / MS_PER_DAY);
        });
    return stats.longestStreak(days);
};

getCurrentStreak = function(log) {
    var days,
        today,
        streaks,
        currentStreak;
    if (log.length === 0) {
        return 0;
    }

    days = log.map(function(entry) {
        return Math.floor(entry.date.getTime() / MS_PER_DAY);
    });
    today = Math.floor((new Date()).getTime() / MS_PER_DAY);
    streaks = stats.streaks(days);
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
    if (log.length === 0) {
        return 0;
    }

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

module.exports = {
    getLongestStreak: getLongestStreak,
    getCurrentStreak: getCurrentStreak,
    getNumSessions: getNumSessions,
    getNumDays: getNumDays,
    getNumByDayOfWeek: getNumByDayOfWeek
};
