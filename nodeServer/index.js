// Assign the server port 
let io = require('socket.io')(4500);

// Directory of users
let user_list = {};

// Event Handling 
io.on('connection', socket => {

    socket.on('new-user-joined', (name) => {
        user_list[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', {message: message, name: user_list[socket.id]});
    })

    socket.on("disconnect", (message) => {
        socket.broadcast.emit("member-left-group", user_list[socket.id]);
        delete user_list[socket.id];

    })
})