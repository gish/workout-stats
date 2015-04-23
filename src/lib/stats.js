var calculateDistance = function(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180,
        radlat2 = Math.PI * lat2/180,
        radlon1 = Math.PI * lon1/180,
        radlon2 = Math.PI * lon2/180,
        theta = lon1-lon2,
        radtheta = Math.PI * theta/180,
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist) * 180/Math.PI * 60 * 1.1515;
    return dist;
};

module.exports = {
    max: function(values) {
        return values.reduce(function(value, highest) {
            if (value > highest) {
                highest = value;
            }
            return highest;
        }, values[0]);
    },

    min: function(values) {
        return values.reduce(function(value, lowest) {
            if (value < lowest) {
                lowest = value;
            }
            return lowest;
        }, values[0]);
    },
    streaks: function(values, comparator) {
        var currentStreak = 1,
            previousValue = values[0];

        comparator =  comparator || function(a, b) {
            return b - a;
        };

        return values.map(function(value) {
            var distance = comparator(previousValue, value);

            if (distance === 1) {
                currentStreak = currentStreak + 1;
            } else if (distance > 1) {
                currentStreak = 1;
            }

            previousValue = value;

            return [value, currentStreak];
        });
    },
    longestStreak: function(values, comparator) {
        var streaks = this.streaks(values, comparator);

        return Math.max.apply(this, streaks.map(function(streak) {
            return streak[1];
        }));
    },
    facility: function(coordinates, facilities) {
        return facilities.reduce(function(previous, facility) {
            var distance = calculateDistance(
                    coordinates[0],
                    coordinates[1],
                    facility.coordinates[0],
                    facility.coordinates[1]
                ),
                previousDistance = calculateDistance(
                    coordinates[0],
                    coordinates[1],
                    previous.coordinates[0],
                    previous.coordinates[1]
                );

            if (distance < previousDistance) {
                return facility;
            }
            return previous;
        }, facilities[0]);
    },
};
