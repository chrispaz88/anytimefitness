const socket = new WebSocket('wss://localhost:8000');

socket.addEventListener('open', (event) => {
    console.log('Conexión establecida con el servidor WebSocket');
});
//socket.onmessage = (event) => { };
socket.addEventListener('message', (event) => {
    event.data.arrayBuffer().then((data) => {
        const message = new TextDecoder('utf-8').decode(data);
        //console.log(message);
        const item = document.createElement('li');
        item.textContent = message;
        document.querySelector('#messages').appendChild(item);
    });
});

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.querySelector('#input').value;
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    }
    const item = document.createElement('li');
    item.textContent = message;
    document.querySelector('#messages').appendChild(item);
    document.querySelector('#input').value = '';
    document.querySelector('#input').focus();
});