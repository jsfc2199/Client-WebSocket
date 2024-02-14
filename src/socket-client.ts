import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    
    //por defecto el servidor al no tener namespace definido en el gateway al lado de la propiedad cors, será entonces la ruta main
    const socket = manager.socket('/'); 

    addListeners(socket);
    
}

const addListeners = (socket: Socket) => {

    const serverStatusLabel = document.querySelector('#server-status');

    //creamos la lista de clientes
    const clientsUl = document.querySelector('#clients-ul')!

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!

    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!
    

    // usamos propiedades del proprio socker
    //para escuchar usamos el metodo on
    socket.on('connect', () => {
        serverStatusLabel!.innerHTML = 'connected';
    })

    socket.on('disconnect', () => {
        serverStatusLabel!.innerHTML = 'disconnected';
    })

    //el argumento es un arreglo de strings pues es lo que emite el servidor
    socket.on('clients-updates', (clients: string[]) => {
        let clientsHTML = '';
        clients.forEach(clientID => {
            clientsHTML += `
            <li>${clientID}</li>
            `
        });
        clientsUl.innerHTML = clientsHTML;
    })
    
    messageForm?.addEventListener('submit', (event) => {
        event.preventDefault()
        if(messageInput.value.trim().length <= 0) return;

        //emitir evento para que el servidor escuche
        socket.emit('message-from-client', {
            id: 'Yo',
            message: messageInput.value,
        })
        //limpiamos el input
        messageInput.value = ''
    })

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        const newMessage =`
        <li>
        <strong>${ payload. fullName }</strong>
        <span></span>${ payload.message }</span>
        </li>`
        
        const li = document.createElement('li')
        li.innerHTML = newMessage
        messagesUl.append(li)
    })

}