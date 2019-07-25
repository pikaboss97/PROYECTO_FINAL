const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const config = require('./server/config');

//database
require('./database');
const app = config(express());
const server = http.createServer(app);
const io = socketio.listen(server);

//socket.io
require('./sockets')(io);


//starting the server
server.listen(app.get('port'), ()=>{
    console.log('server on port',app.get('port'));
});
