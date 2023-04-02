const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

app.use('/', express.static(__dirname + '/public'));

const server = app.listen(3000, () => console.log(`Server has started at http://localhost:${PORT}`));

const io = require('socket.io')(server);

clientsConnected = [];

// listen for socket.io connections
io.on('connection', socket => {
    console.log(`socket connection with id: ${socket.id}`);
    clientsConnected[socket.id] = '1';
    

    // emit user connected message to all connected clients

    // handle the socket client disconnect event
    socket.on('disconnect', () => {
        console.log(`socket id: ${socket.id} has disconnected`);
    });
});
