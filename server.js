const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 42069;
const HOST = 'localhost';

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const server = app.listen(PORT, () => console.log(`Server has started at http://localhost:${PORT}`));

app.post('/chat-application.tml', (req, res) => {
    console.log('post hit');
    res.send('something did ome here');
});

app.get('/', (req, res) => {
    console.log('got GET at /');
    res.sendFile(__dirname + '/public/login.html');
});

// Handle the login form ission
app.post('/login', (req, res) => {
    // Get the username and password from the form data
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password);

    // Validate the username and password (example: hardcoded values)
    if (username === 'a' && password === 'a') {
        // Redirect to a success page
        res.redirect('/success');
    } else {
        // Redirect to an error page
        res.redirect('/error');
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
