var React = require('react'),
    Reflux = require('reflux'),
    statsStore = require('../stores/stats-store.js'),
    actions = require('../actions/actions.js'),
    NumericStatsView = require('./numeric-stats.jsx'),
    WorkoutsPerDayView = require('./workouts-per-day.jsx'),
    WorkoutsPerFacilityView = require('./workouts-per-facility.jsx'),
    Main;

Main = React.createClass({
    mixins: [
        Reflux.listenTo(statsStore, 'onUpdate')
    ],

    componentDidMount: function() {
        var documentId = window.location.hash.substr(1);
        actions.load(documentId);
    },

    getInitialState: function() {
        return {
            log: []
        };
    },

    onUpdate: function(log) {
        this.setState({log: log});
    },

    render: function() {
        return (
            <div className="site-wrapper">
                <NumericStatsView log={this.state.log} />
                <WorkoutsPerDayView log={this.state.log} />
                <WorkoutsPerFacilityView log={this.state.log} />
            </div>
        );
    }
});

module.exports = Main;
