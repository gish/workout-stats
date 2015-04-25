var React = require('react'),
    workoutStats = require('./../lib/workout-stats.js'),
    Main;

Main = React.createClass({
    getStats: function(log) {
        return {
            currentStreak: workoutStats.getCurrentStreak(log),
            longestStreak: workoutStats.getLongestStreak(log),
            numDays: workoutStats.getNumDays(log),
            numSessions: workoutStats.getNumSessions(log),
        };
    },

    render: function() {
        var sessionsPerDay = 0,
            stats;

        stats = this.getStats(this.props.log);

        if (stats.numDays) {
            sessionsPerDay = Math.round(stats.numSessions*10/stats.numDays)/10;
        }

        return (
            <table className="stats-table">
                <tr>
                    <td className="stats-table__title">Current streak</td>
                    <td className="stats-table__value">{stats.currentStreak}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Longest streak</td>
                    <td className="stats-table__value">{stats.longestStreak}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Number of days</td>
                    <td className="stats-table__value">{stats.numDays}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Number of sessions</td>
                    <td className="stats-table__value">{stats.numSessions}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Sessions per day</td>
                    <td className="stats-table__value">{sessionsPerDay}</td>
                </tr>
            </table>
        );
    }
});

module.exports = Main;
