const socket = io();
// const url = require('url');


const mainChat = document.getElementById('main-chat');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
let userID = 69;

socket.on('admin-message', message => {
    console.log(`${message.id}: ${message.chatMessage}`);
    userID = message.id;
});

socket.on('new-message', message => {
    console.log(`${message.id}: ${message.chatMessage}`);
    const chat = `${socket.id}: ${message.chatMessage}`;
    const newDiv = newDivMessage(chat);
    mainChat.appendChild(newDiv);
});

sendButton.onclick = () => {
    const inputText= chatInput.value;
    const newChat = `You: ${inputText}`;
    const newDiv = newDivMessage(newChat);  
    mainChat.appendChild(newDiv);
    socket.emit('new-message', {id: userID, chatMessage: inputText});
};

function newDivMessage(chatText) {
    const newDiv = document.createElement('div');
    newDiv.innerText = chatText;
    newDiv.style = 'border-radius: 7px; margin: 10px; border: 1px solid black';
    return newDiv;
};

// use URL parser to extract the username from URL