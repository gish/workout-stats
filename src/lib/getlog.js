var datejs = require('datejs'),
    Q = require('q'),
    GoogleSpreadsheet = require('google-spreadsheet'),
    getSpreadsheetData,
    getLog,
    workouts;


getSpreadsheetData = function(key) {
    var sheet = new GoogleSpreadsheet(key),
        deferred = new Q.defer();
    sheet.getRows(1, function(err, data) {
        deferred.resolve(data);
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
