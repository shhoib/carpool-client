import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');
socket.on('connect', () => {
// console.log('Connected. Socket ID:', socket.id);
});
// console.log(socket);
// console.log(socket.id);

export default socket;
