var React = require('react'),
    workoutStats = require('./../lib/workout-stats.js'),
    Main;

Main = React.createClass({
    render: function() {
        var stats = workoutStats.getNumByDayOfWeek(this.props.log);

        return (
            <table className="stats-table">
                <tr>
                    <td className="stats-table__title">Monday</td>
                    <td className="stats-table__value">{stats[0]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Tuesday</td>
                    <td className="stats-table__value">{stats[1]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Wednesday</td>
                    <td className="stats-table__value">{stats[2]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Thursday</td>
                    <td className="stats-table__value">{stats[3]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Friday</td>
                    <td className="stats-table__value">{stats[4]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Saturday</td>
                    <td className="stats-table__value">{stats[5]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Sunday</td>
                    <td className="stats-table__value">{stats[6]}</td>
                </tr>
            </table>
        );
    }
});

module.exports = Main;
