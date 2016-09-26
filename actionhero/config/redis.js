var host     = process.env.REDIS_HOST || '127.0.0.1';
var port     = process.env.REDIS_PORT || 6379;
var db       = process.env.REDIS_DB   || 0;
var password = process.env.REDIS_PASS || null;

exports['default'] = {
  redis: function(api){

    // konstructor: The redis client constructor method
    // args: The arguments to pass to the constructor
    // buildNew: is it `new konstructor()` or just `konstructor()`?

    if(process.env.FAKEREDIS === 'false' || process.env.REDIS_HOST !== undefined){

      function retryStrategy(times){
        if(times === 1){
          api.log('Unable to connect to Redis - please check your Redis config!', 'error');
          return 5000;
        }

        return Math.min(times * 50, maxBackoff);
      }

      return {
        '_toExpand': false,
        client: {
          konstructor: require('ioredis'),
          args: [{ port: port, host: host, password: password, db: db, retryStrategy: retryStrategy }],
          buildNew: true
        },
        subscriber: {
          konstructor: require('ioredis'),
          args: [{ port: port, host: host, password: password, db: db, retryStrategy: retryStrategy }],
          buildNew: true
        },
        tasks: {
          konstructor: require('ioredis'),
          args: [{ port: port, host: host, password: password, db: db, retryStrategy: retryStrategy }],
          buildNew: true
        }
      };

    }else{
    	// This is where the magic happens.  Sharing a fakeredis instance between mulitple processes...
		var fakeredis;
		if (require('is-electron-renderer')) {
			// Electron Render (background) process
			fakeredis = require('electron').remote.require('fakeredis');
		} else {
			// Electron Main process
			fakeredis = require('fakeredis');
		}
		return {
			'_toExpand': false,
			client: {
				konstructor: fakeredis.createClient,
				args: [port, host, {fast: true}],
				buildNew: false
			},
			subscriber: {
				konstructor: fakeredis.createClient,
				args: [port, host, {fast: true}],
				buildNew: false
			},
			tasks: {
				konstructor: fakeredis.createClient,
				args: [port, host, {fast: true}],
				buildNew: false
			}
		};

    }
  }
};
