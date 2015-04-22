var React = require('react'),
    Total;

Total = React.createClass({
    render: function() {
        return (
            <div>Number of sessions: {this.props.total}</div>
        );
    }
});

module.exports = Total;
