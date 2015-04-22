var React = require('react'),
    Streak;

Streak = React.createClass({
    render: function() {
        return (
            <div>Current streak: {this.props.streak}</div>
        );
    }
});

module.exports = Streak;
