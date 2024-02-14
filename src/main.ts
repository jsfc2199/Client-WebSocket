import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>WebSocket client</h1>

   <input id= "jwt-token" placehorlder="Json web Token" />
   <br/>
    <button id = "btn-connect">Connect</button>

   <span id="server-status">offline</span>
   <ul id="clients-ul"></ul>

  <form id="message-form">
    <input placeholder="message" id="message-input" />
  </form>

  <h3>Messages</h3>
  <ul id="messages-ul"></ul>  
  </div>
`;

// connectToServer();
//la idea es conectarnos cuando tengamos el jwt
const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!

btnConnect.addEventListener('click', () => {
  if(jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT')
  connectToServer(jwtToken.value.trim())
})
