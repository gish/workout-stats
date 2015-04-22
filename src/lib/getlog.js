var datejs = require('datejs'),
    Q = require('q'),
    jsonp = require('jsonp'),
    getSpreadsheetData,
    getLog,
    workouts;


getSpreadsheetData = function(key) {
    var deferred = new Q.defer(),
        url = 'https://spreadsheets.google.com/feeds/list/' + key + '/od6/public/values?alt=json-in-script';

    jsonp(url, function(err, data) {
        var entries = data.feed.entry,
            rows = entries.map(function(entry) {
            return {
                date: entry.gsx$date.$t,
                lat: entry.gsx$lat.$t,
                lon: entry.gsx$lon.$t
            };
        });
        deferred.resolve(rows);
    });

    return deferred.promise;
};

getLog = function(key) {
    var deferred = new Q.defer(),
        transformedData;

    getSpreadsheetData(key).then(function(data) {
        transformedData = data.map(function(row) {
            return {
                date: Date.parse(row.date),
                lat: row.lat,
                lon: row.lon
            };
        });
        deferred.resolve(transformedData);
    });

    return deferred.promise;
};

module.exports = getLog;
