'use strict';

// required packages
const path = require('path');

// base
const express = require('express');
const app = express();
app.set('port', '1337');

// domain (to catch asynchronous error)
const domain = require('express-domain-middleware');
app.use(domain);

// json
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// server
const http = require('http');
const server = http.createServer(app);

// graceful shutdown
const gracefulShutdown = function() {
    console.log("Received kill signal, shutting down gracefully.");
    //app.get('mysql').terminate();
    server.close(function() {
        console.log("Closed out remaining connections.");
        process.exit();
    });
};
process.on ('SIGTERM', gracefulShutdown); // listen for TERM signal .e.g. kill
process.on ('SIGINT', gracefulShutdown); // listen for INT signal e.g. Ctrl-C


// router
const routes = require('./routers');
for (let router of routes) {
    app.use('/', router);
}

// http 404 error handler
app.use(function(req, res, next) {
    const err = new Error('The requested URL has not been found');
    err.status = 404;
    next(err);
});

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    const errorHandler = require('errorhandler');
    app.use(errorHandler());
}

// listen
server.listen(app.get('port'));
