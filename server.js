const express = require('express');

const {Server} = require('socket.io');

const app = express();

const http = require('http');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);

const io = new Server(server);

const PORT = process.env.PORT || 3001;


const userSocketMap = {};

function getallConnectedClients(roomID) {
   return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map((socketId) => {
    return {
        socketId,
        username: userSocketMap[socketId],
    }
});
}


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on(ACTIONS.JOIN, ({roomID , username}) => {

        userSocketMap[socket.id] = username;
        socket.join(roomID);

        const clients = getallConnectedClients(roomID);
        console.log(clients);
        
        clients.forEach(({socketId})=> {
            socket.to(socketId).emit(ACTIONS.JOINED, {clients,
            username:username,
            socketId: socket.id,
            
        });
});
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
    
        rooms.forEach((roomId) => {
            socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
    
        delete userSocketMap[socket.id];
    });
    

});









server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



