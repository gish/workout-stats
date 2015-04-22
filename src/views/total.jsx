var React = require('react'),
    Total;

Total = React.createClass({
    render: function() {
        return (
            <div>Total: {this.props.total}</div>
        );
    }
});

module.exports = Total;
