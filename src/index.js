const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


let msg = [
    "Hi",
];

const getData = () => ( msg );

const setData = (data) => {
    msg.push(data);
};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on("msg_from_client", (msg) => {
        setData(msg);
    });
    socket.on("get_msg_from_client", getData);

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});
