// websocket del lado del cliente
const socket = io();

// referencias al DOM
const formChat = document.getElementById('formChat');
const inputChat = document.getElementById('inputChat');
const inputUserName = document.getElementById('inputUserName');
const chatBox = document.getElementById('chatBox');

// ===== SOCKET EVENTS =====

// bienvenida
socket.on('welcome', (data) => {
    console.log(data);
});

// historial de mensajes
socket.on('message history', (messages) => {
    chatBox.innerHTML = '';
    messages.forEach((dataMessage) => {
        chatBox.innerHTML += `<p>${dataMessage.username}: ${dataMessage.message}</p>`;
    });
});

// nuevo mensaje broadcast
socket.on('broadcast new message', (dataMessage) => {
    chatBox.innerHTML += `<p>${dataMessage.username}: ${dataMessage.message}</p>`;
});

// ===== DOM EVENTS =====

formChat.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = inputUserName.value.trim();
    const message = inputChat.value.trim();

    if (!username || !message) return;

    socket.emit('new message', { username, message });

    inputChat.value = '';
});
