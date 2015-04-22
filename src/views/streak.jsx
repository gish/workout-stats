var React = require('react'),
    Streak;

Streak = React.createClass({
    render: function() {
        return (
            <div>Streak: {this.props.streak}</div>
        );
    }
});

module.exports = Streak;
