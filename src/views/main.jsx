var React = require('react'),
    Reflux = require('reflux'),
    statsStore = require('../stores/stats-store.js'),
    actions = require('../actions/actions.js'),
    StreakView = require('./streak.jsx'),
    TotalView = require('./total.jsx'),
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
                <StreakView streak={this.state.currentStreak} />
                <TotalView total={this.state.numDays} />
            </div>
        );
    }
});

module.exports = Main;
