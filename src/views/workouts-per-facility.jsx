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

    render: function() {
        var facilityStats = this.getVisitedFacilities(this.props.log);

        return (
            <table className="stats-table">
                {facilityStats.map(function(facility) {
                    return (
                        <tr>
                            <td className="stats-table__title">{facility.name}</td>
                            <td className="stats-table__value">{facility.visits}</td>
                        </tr>
                    )
                })}
            </table>
        );
    }
});

module.exports = Main;
