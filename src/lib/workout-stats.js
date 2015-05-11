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
        yesterday,
        streaks,
        todaysStreak = 0,
        yesterdaysStreak = 0;
    if (log.length === 0) {
        return 0;
    }

    days = log.map(function(entry) {
        return Math.floor(entry.date.getTime() / MS_PER_DAY);
    });

    today = Math.floor((new Date()).getTime() / MS_PER_DAY);
    yesterday = Math.floor((new Date()).getTime() / MS_PER_DAY - 1);
    streaks = stats.streaks(days);

    streaks.map(function(streak) {
        if (streak[0] === today) {
            todaysStreak = streak[1];
        } else if (streak[0] === yesterday) {
            yesterdaysStreak = streak[1];
        }
    });

    if (todaysStreak > yesterdaysStreak) {
        return todaysStreak;
    }

    return yesterdaysStreak;
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
    getNumByDayOfWeek: getNumByDayOfWeek,
    getFacility: stats.facility
};
