var React = require('react');

module.exports = React.createClass({
    onToDate: function(unit) {
        var params = {
            type: 'toDate',
            value: unit
        };

        this.props.onFilter(params);
    },

    onDaysBack: function(numDays) {
        var params = {
            type: 'daysBack',
            value: numDays
        };

        this.props.onFilter(params);
    },

    render: function() {
        return (
            <div>
                <ul className="day-filter">
                    <li className="day-filter__item"><button onClick={this.onToDate.bind(null, 'week')}>wtd</button></li>
                    <li className="day-filter__item"><button onClick={this.onToDate.bind(null, 'month')}>mtd</button></li>
                    <li className="day-filter__item"><button onClick={this.onDaysBack.bind(null, 7)}>last 7d</button></li>
                    <li className="day-filter__item"><button onClick={this.onDaysBack.bind(null, 14)}>last 14d</button></li>
                    <li className="day-filter__item"><button onClick={this.onDaysBack.bind(null, 30)}>last 30d</button></li>
                </ul>
            </div>
        )
    }
});
