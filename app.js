
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');


var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
}; 



// Routes
app.get('/', routes.index);
//app.get('/partial/:name', routes.partial);
app.get('/view/:name', routes.partial);

// JSON API
app.get('/api/config', api.config);
app.get('/api/levels', api.levels);
app.get('/api/users/:userId/vlabs/:vlabId/info', api.userLevel);
app.get('/api/vlabs/:vlabId/level/:levelId', api.labLevelStory);
app.get('/api/users/:userId/vlabs/:vlabId/level/:levelId/lab', api.labInfo);
app.get('/api/vlabs', api.GetAllVlabs);
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});