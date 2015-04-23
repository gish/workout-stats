var React = require('react'),
    Streak;

Streak = React.createClass({
    render: function() {
        return (
            <div className="stat">
                <span className="stat__value">
                    {this.props.streak}
                </span>
                <span className="stat__title">Current streak</span>
            </div>
        );
    }
});

module.exports = Streak;
