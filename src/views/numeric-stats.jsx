var React = require('react'),
    Reflux = require('reflux'),
    Main;

Main = React.createClass({
    render: function() {
        var sessionsPerDay = 0;

        if (this.props.numDays) {
            sessionsPerDay = Math.round(this.props.numSessions*10/this.props.numDays)/10;
        }

        return (
            <table className="stats-table">
                <tr>
                    <td className="stats-table__title">Current streak</td>
                    <td className="stats-table__value">{this.props.currentStreak}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Longest streak</td>
                    <td className="stats-table__value">{this.props.longestStreak}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Number of days</td>
                    <td className="stats-table__value">{this.props.numDays}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Number of sessions</td>
                    <td className="stats-table__value">{this.props.numSessions}</td>
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
