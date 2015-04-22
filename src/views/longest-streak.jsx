var React = require('react'),
    Streak;

Streak = React.createClass({
    render: function() {
        return (
            <div>Longest streak: {this.props.streak}</div>
        );
    }
});

module.exports = Streak;
