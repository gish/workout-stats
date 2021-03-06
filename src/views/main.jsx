var React = require('react'),
    Reflux = require('reflux'),
    statsStore = require('../stores/stats-store.js'),
    actions = require('../actions/actions.js'),
    moment = require('moment'),
    NumericStatsView = require('./numeric-stats.jsx'),
    WorkoutsPerDayView = require('./workouts-per-day.jsx'),
    WorkoutsPerFacilityView = require('./workouts-per-facility.jsx'),
    DayFilterView = require('./day-filter.jsx'),
    Main;

moment.locale('se', {
    week: {
        dow: 1
    }
});

Main = React.createClass({
    mixins: [
        Reflux.listenTo(statsStore, 'onUpdate')
    ],

    componentDidMount: function() {
        var documentId = window.location.hash.substr(1);
        actions.load(documentId);
    },

    getInitialState: function() {
        var log = statsStore.getCached() || [];

        return {
            filteredLog: log,
            log: log
        };
    },

    onUpdate: function(log) {
        this.setState({
            filteredLog: log,
            log: log
        });
    },

    filterLog: function(opts) {
        var filteredLog = this.state.filteredLog;

        if (opts.type === 'daysBack') {
            filteredLog = this.getDaysBack(opts.value);
        }

        if (opts.type === 'toDate') {
            filteredLog = this.getToDate(opts.value);
        }

        this.setState({filteredLog: filteredLog});
    },

    getFilteredLog: function(pastDate) {
        var log = this.state.log,
            filteredLog;

        filteredLog = log.reduce(function(filteredDays, curr) {
            if (curr.date.getTime()/1E3 >= pastDate.unix()) {
                filteredDays.push(curr);
            }
            return filteredDays;
        }, []);

        return filteredLog;
    },

    getToDate: function(unit) {
        var pastDate = moment().startOf(unit);

        return this.getFilteredLog(pastDate);
    },

    getDaysBack: function(numDaysBack) {
        var pastDate = moment().subtract(numDaysBack, 'days');

        return this.getFilteredLog(pastDate);
    },

    render: function() {
        return (
            <div className="site-wrapper">
                <DayFilterView onFilter={this.filterLog} />
                <NumericStatsView log={this.state.filteredLog} />
                <WorkoutsPerDayView log={this.state.filteredLog} />
                <WorkoutsPerFacilityView log={this.state.filteredLog} />
            </div>
        );
    }
});

module.exports = Main;
