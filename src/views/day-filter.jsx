var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <ul className="day-filter">
                    <li className="day-filter__item"><button onClick={this.props.onFilter.bind(null, 7)}>last 7d</button></li>
                    <li className="day-filter__item"><button onClick={this.props.onFilter.bind(null, 14)}>last 14d</button></li>
                    <li className="day-filter__item"><button onClick={this.props.onFilter.bind(null, 30)}>last 30d</button></li>
                </ul>
            </div>
        )
    }
});
