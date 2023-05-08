const socket = io();
let username = undefined;

const mainChat = document.getElementById('main-chat');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
let userID = 69;

socket.on('admin-message', message => {
    console.log(`${message.username}: ${message.chatMessage}`);
    // userID = message.id;
    username = message.username;
});

socket.on('new-message', message => {
    console.log(`${username}: ${message.chatMessage}`);
    // const chat = `${socket.username}: ${message.chatMessage}`;
    const chat = `${message.username}: ${message.chatMessage}`;
    const newDiv = newDivMessage(chat);
    mainChat.appendChild(newDiv);
});

sendButton.onclick = () => {
    const inputText= chatInput.value;
    const newChat = `You: ${inputText}`;
    const newDiv = newDivMessage(newChat);  
    mainChat.appendChild(newDiv);
    socket.emit('new-message', {username: username, chatMessage: inputText});
};

function newDivMessage(chatText) {
    const newDiv = document.createElement('div');
    newDiv.innerText = chatText;
    newDiv.style = 'border-radius: 7px; margin: 10px; border: 1px solid black';
    return newDiv;
};
