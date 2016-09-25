var task = {
	name:          "check",
	description:   "Log a message",
	queue:         "default",
	plugins:       [],
	pluginOptions: [],
	frequency:     1000,
	run: function(api, params, next){
		var win = require('electron').remote.getCurrentWindow();
		api.log(`Periodic task run in worker ${api.id}, browser window ${win.id}`);
		next();
	}
};

exports.checkTask = task;
