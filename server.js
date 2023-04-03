const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 42069;
const HOST = 'localhost';

app.use('/', express.static(__dirname + '/public'));

const server = app.listen(PORT, () => console.log(`Server has started at http://localhost:${PORT}`));

const io = require('socket.io')(server);

clientsConnected = [];

// listen for socket.io connections
io.on('connection', socket => {
    console.log(`socket connection with id: ${socket.id}`);
    clientsConnected[socket.id] = '1';
    socket.emit('admin-message', {id: socket.id, chatMessage: 'Welcome to the Common Conversations Room'});

    // send user joined message to everyone other than the one joined
    socket.broadcast.emit('admin-message', {id: socket.id, chatMessage: 'has joined the chat'});

    // message from user
    socket.on('new-message', message => {
        console.log(`${message.id}: ${message.chatMessage}`);
        socket.broadcast.emit('new-message', message);
    });
    
    // handle the socket client disconnect event
    socket.on('disconnect', () => {
        console.log(`socket id: ${socket.id} has disconnected`);
        io.emit('admin-message', {id: socket.id, chatMessage: 'has left the chat'});
    });
});
