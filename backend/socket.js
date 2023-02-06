const socketIO = require("socket.io");
const socket = {

};

function connect(server) {
    socket.io = socketIO(server);
};

module.export = {
    connect,
    socket
}