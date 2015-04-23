var React = require('react'),
    Reflux = require('reflux'),
    statsStore = require('../stores/stats-store.js'),
    actions = require('../actions/actions.js'),
    NumericStatsView = require('./numeric-stats.jsx'),
    WorkoutsPerDayView = require('./workouts-per-day.jsx'),
    Main;

Main = React.createClass({
    mixins: [
        Reflux.listenTo(statsStore, 'onUpdate')
    ],

    getInitialState: function() {
        return {
            longestStreak: 0,
            currentStreak: 0,
            numDays: 0,
            numSessions: 0,
            numByDayOfWeek: [0,0,0,0,0,0,0]
        };
    },

    componentDidMount: function() {
        var documentId = window.location.hash.substr(1);
        actions.load(documentId);
    },

    onUpdate: function(stats) {
        this.setState(stats);
    },

    render: function() {
        return (
            <div className="site-wrapper">
                <NumericStatsView
                    currentStreak={this.state.currentStreak}
                    longestStreak={this.state.longestStreak}
                    numDays={this.state.numDays}
                    numSessions={this.state.numSessions}
                />
                <WorkoutsPerDayView numByDay={this.state.numByDayOfWeek} />
            </div>
        );
    }
});

module.exports = Main;
