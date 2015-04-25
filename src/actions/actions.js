var Reflux = require('reflux'),
    getLog = require('../lib/getlog.js'),
    Actions;

Actions = Reflux.createActions({
    load: { children: ['completed'] }
});

Actions.load.listen(function(secret) {
    getLog(secret).then(this.completed);
});

module.exports = Actions;
