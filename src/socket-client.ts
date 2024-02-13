import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    
    //por defecto el servidor al no tener namespace definido en el gateway al lado de la propiedad cors, será entonces la ruta main
    const socket = manager.socket('/'); 

    addListeners(socket);
    
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status');

    // usamos propiedades del proprio socker
    //para escuchar usamos el metodo on
    socket.on('connect', () => {
        serverStatusLabel!.innerHTML = 'connected';
    })

    socket.on('disconnect', () => {
        serverStatusLabel!.innerHTML = 'disconnected';
    })
}