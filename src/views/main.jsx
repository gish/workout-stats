var React = require('react'),
    Reflux = require('reflux'),
    statsStore = require('../stores/stats-store.js'),
    actions = require('../actions/actions.js'),
    CurrentStreakView = require('./current-streak.jsx'),
    LongestStreakView = require('./longest-streak.jsx'),
    NumberDaysView = require('./num-days.jsx'),
    NumberSessionsView = require('./num-sessions.jsx'),
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
            numSessions: 0
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
            <div>
                <CurrentStreakView streak={this.state.currentStreak} />
                <LongestStreakView streak={this.state.longestStreak} />
                <NumberDaysView total={this.state.numDays} />
                <NumberSessionsView total={this.state.numSessions} />
            </div>
        );
    }
});

module.exports = Main;
