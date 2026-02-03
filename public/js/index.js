const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const formChat = document.getElementById('formChat');
    const inputChat = document.getElementById('inputChat');
    const inputUserName = document.getElementById('inputUsername');
    const chatBox = document.getElementById('chatBox');

    // ===== SOCKET EVENTS =====

    socket.on('welcome', (data) => {
        console.log(data);
    });

    socket.on('message history', (messages) => {
        chatBox.innerHTML = '';
        messages.forEach((dataMessage) => {
            chatBox.innerHTML += `<p>${dataMessage.username}: ${dataMessage.message}</p>`;
        });
    });

    socket.on('broadcast new message', (dataMessage) => {
        chatBox.innerHTML += `<p>${dataMessage.username}: ${dataMessage.message}</p>`;
    });

    // ===== FORM =====

    formChat.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = inputUserName.value.trim();
        const message = inputChat.value.trim();

        if (!username || !message) return;

        socket.emit('new message', { username, message });

        inputChat.value = '';
    });
});
