// websocket del lado del cliente


// iniciamos la conexion desde nuestro cliente 
const socket = io();

const main = () =>{
    //emitimos un ecent desde el cliente al servidor 

socket.on('welcome', (data)=>{
    console.log(data);
    
    //formulario 
    const formChat = document.getElementById('formChat');
    const inputChat = document.getElementById('inputChat')
    const inputUserName = document.getElementById('inputUserName')

    formChat.addEventListener('submit',(event)=>{
        event.preventDefault();
        const username = inputUserName.value;
        const message = inputChat.value;
        inputChat.value = ' ';

        socket.emit('new message',{message, username})

       
    })

     //capturamos los mensajes nuevos
        socket.on('broadcast new message',(dataMessage) =>{
            //insertamos nuevo mensaje en nuestra plantilla 
            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML += `<p> ${dataMessage.username}-${dataMessage.message}</p>`;
        })

        // capturamos msj
        socket.on('message history', (messages)=>{
                const chatBox = document.getElementById('chatBox');
                messages.forEach((dataMessage)=>{
                    chatBox.innerHTML += `<p> ${dataMessage.username}-${dataMessage.message}</p>`;
                })

        })

     
})
}

main();