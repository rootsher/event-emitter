var EventEmitter = require('../lib/EventEmitter.js');

function DatabaseAdapter() {
	this._host = undefined;
	this._port = undefined;
}

DatabaseAdapter.prototype = Object.create(EventEmitter.prototype);

DatabaseAdapter.prototype.connect = function (host, port) {
	this._host = host;
	this._port = port;
	// Connection process...
	this.emit('connectionFinished');
};


var databaseAdapter = new DatabaseAdapter();

databaseAdapter.on('connectionFinished', function () {
	this.emit('installDatabase');
});

databaseAdapter.once('installDatabase', function () {
	// Installation process...
	this.emit('run', {
		host: this._host,
		port: this._port
	});
});

databaseAdapter.on('run', function (options) {
	console.log('Database running.');
	console.log('Host:', this._host);
	console.log('Port:', this._port);
});


databaseAdapter.connect('127.0.0.1', 8080);