var React = require('react'),
    facilities = require('./../lib/facilities.json'),
    workoutStats = require('./../lib/workout-stats.js'),
    Main;

Main = React.createClass({
    getVisitedFacilities: function(log) {
        var visitedFacilities;

        visitedFacilities = facilities.map(function(facility) {
            return {
                id: facility.id,
                name: facility.name,
                lat: facility.lat,
                lon: facility.lon,
                visits: 0
            };
        });

        log.map(function(row) {
            var rowFacility = workoutStats.getFacility(row, facilities);

            visitedFacilities = visitedFacilities.map(function(visitedFacility) {
                if (visitedFacility.id === rowFacility.id) {
                    visitedFacility.visits = visitedFacility.visits + 1;
                }
                return visitedFacility;
            });
        });

        return visitedFacilities;
    },

    getFacilitiesSortedBy: function(key) {
        var facilities = this.getVisitedFacilities(this.props.log),
            sortMethods = {
                visits: function(a, b) {
                    return b[key] - a[key];
                },
                name: function(a, b) {
                    return a[key] - b[key];
                }
            };

        return facilities.sort(sortMethods[key]);
    },

    getInitialState: function() {
        var sort = 'name';

        return {
            sort: sort,
            facilities: this.getFacilitiesSortedBy(sort)
        };
    },

    sortFacilities: function(event) {
        var value = event.target.value;
        this.setState({ sort: value });
    },

    render: function() {
        var facilities = this.getFacilitiesSortedBy(this.state.sort);

        return (
            <div>
                <select onChange={this.sortFacilities} className="dropdown">
                    <option value="name">By name</option>
                    <option value="visits">By count</option>
                </select>
                <table className="stats-table">
                    {facilities.map(function(facility) {
                        return (
                            <tr>
                                <td className="stats-table__title">{facility.name}</td>
                                <td className="stats-table__value">{facility.visits}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
});

module.exports = Main;
