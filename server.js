const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

let username = undefined;

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const server = app.listen(PORT, () => console.log(`Server has started at http://localhost:${PORT}`));

app.post('/chat-application.tml', (req, res) => {
    console.log('post hit');
    res.send('something did ome here');
});

app.get('/chat', (req, res) => {
    console.log('got GET at /');
    res.sendFile(__dirname + '/public/login.html');
});

// Handle the login form ission
app.post('/login', (req, res) => {
    // Get the username and password from the form data
    username = req.body.username;
    // const getUsername = req.body.username;
    const password = req.body.password;

    console.log(username, password);

    // Validate the username and password (example: hardcoded values)
    // if (getUsername === 'a' && password === 'a') {
    //     // Redirect to a success page
    //     res.redirect('/success');
    // } else {
    //     // Redirect to an error page
    //     res.redirect('/error');
    // }

    if (username.length != 0) {
        console.log(username);
        res.redirect('/success');
    } else {
        res.redirect('/login');
    }

});

// Serve the success page
app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/public/chat-application.html');
});

// Serve the error page
app.get('/error', (req, res) => {
    res.sendFile(__dirname + '/public/error.html');
});


const io = require('socket.io')(server);

clients = {};

// listen for socket.io connections
io.on('connection', socket => {
    console.log(`Total number of connections: ${clients.length}`);
    console.log(`socket connection with name: ${username} and socket.id: ${socket.id}`);

    clients[socket.id] = username;

    socket.emit('admin-message', {
        username: clients[socket.id],
        id: socket.id, 
        chatMessage: 'Welcome to the Common Conversations Room'
    });

    // send user joined message to everyone other than the one joined
    socket.broadcast.emit('admin-message', {
        username: clients[socket.id],
        id: socket.id, 
        chatMessage: 'has joined the chat'
    });

    // message from user
    socket.on('new-message', message => {
        console.log(`${message.username}: ${message.chatMessage}`);
        socket.broadcast.emit('new-message', message);
    });
    
    // handle the socket client disconnect event
    socket.on('disconnect', () => {
        console.log(`socket id: ${socket.id} has disconnected`);
        io.emit('admin-message', {
            username: username,
            id: socket.id, 
            chatMessage: 'has left the chat'
        });
    });
});
