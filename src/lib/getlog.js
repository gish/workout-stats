var datejs = require('datejs'),
    Promise = require('node-promise').Promise,
    GoogleSpreadsheet = require('google-spreadsheet'),
    getSpreadsheetData,
    getLog,
    workouts;


getSpreadsheetData = function(key) {
    var sheet = new GoogleSpreadsheet(key),
        promise = new Promise();
    sheet.getRows(1, function(err, data) {
        promise.resolve(data);
    });
    return promise;
};

getLog = function(key) {
    var promise = new Promise(),
        transformedData;

    getSpreadsheetData(key).then(function(data) {
        transformedData = data.map(function(row) {
            return {
                date: Date.parse(row.date),
                lat: row.lat,
                lon: row.lon
            };
        });
        promise.resolve(transformedData);
    });

    return promise;
};

module.exports = getLog;
