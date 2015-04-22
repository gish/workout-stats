var Reflux = require('reflux'),
    workoutStats = require('../lib/workout-stats.js'),
    Actions;

Actions = Reflux.createActions({
    load: { children: ['completed'] }
});

Actions.load.listen(function(secret) {
    workoutStats(secret).then(this.completed);
});

module.exports = Actions;
