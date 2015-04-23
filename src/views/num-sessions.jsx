var React = require('react'),
    Total;

Total = React.createClass({
    render: function() {
        return (
             <div className="stat">
                <span className="stat__value">
                    {this.props.total}
                </span>
                <span className="stat__title">Number of sessions</span>
            </div>
        );
    }
});

module.exports = Total;
