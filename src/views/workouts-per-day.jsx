var React = require('react'),
    Main;

Main = React.createClass({
    render: function() {
        return (
            <table className="stats-table">
                <tr>
                    <td className="stats-table__title">Monday</td>
                    <td className="stats-table__value">{this.props.numByDay[0]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Tuesday</td>
                    <td className="stats-table__value">{this.props.numByDay[1]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Wednesday</td>
                    <td className="stats-table__value">{this.props.numByDay[2]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Thursday</td>
                    <td className="stats-table__value">{this.props.numByDay[3]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Friday</td>
                    <td className="stats-table__value">{this.props.numByDay[4]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Saturday</td>
                    <td className="stats-table__value">{this.props.numByDay[5]}</td>
                </tr>
                <tr>
                    <td className="stats-table__title">Sunday</td>
                    <td className="stats-table__value">{this.props.numByDay[6]}</td>
                </tr>
            </table>
        );
    }
});

module.exports = Main;
