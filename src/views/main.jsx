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

    init: function() {
        actions.load();
    },

    getInitialState: function() {
        return {
            streak: 0,
            total: 0
        };
    },

    onUpdate: function(stats) {
        this.setState(stats);
    },

    render: function() {
        return (
            <div>
                <StreakView streak={this.state.streak} />
                <TotalView total={this.state.total} />
            </div>
        );
    }
});

module.exports = Main;
