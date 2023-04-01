const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

app.use(express.static(__dirname + '/public'));

const server = app.listen(3000, () => console.log(`Server has started at http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.send('User Here')
});

app.post('/chat-application.html', (req, res) => {
    res.send('<h1>This is chatting<h1>')
})
