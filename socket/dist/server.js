"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({
    cors: {
        // origin: "https://bright-route.online",
        origin: "http://localhost:5173",
        credentials: true,
    },
});
let users = [];
const addUser = (userId, socketId) => {
    if (!users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId });
    }
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
    console.log("Socket Connected");
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log("USERS", users);
        io.emit("getUsers", users);
    });
    socket.on("typing", (value) => {
        console.log("VALU___>", value);
        const socketIdOne = getUser(value);
        console.log("Reciver Id", socketIdOne);
        if (socketIdOne) {
            console.log("Sending the typing", socketIdOne);
            socket.to([socketIdOne === null || socketIdOne === void 0 ? void 0 : socketIdOne.socketId]).emit("getTyping");
        }
    });
    socket.on("sendMessage", (message) => {
        const user = getUser(message === null || message === void 0 ? void 0 : message.receiverId);
        if (user && message) {
            const { socketId } = user;
            console.log("Sending Message to ->", socketId);
            io.to(socketId).emit("getMessage", message);
        }
        else {
            console.error(`User with ID ${message === null || message === void 0 ? void 0 : message.receiverId} not found`);
        }
    });
    socket.on("sendNotification", ({ senderId, receiverId, content, type }) => {
        const user = getUser(receiverId);
        if (user) {
            const { socketId } = user;
            io.to(socketId).emit("getNotification", {
                senderId,
                content,
                type,
            });
        }
        else {
            console.error(`User with ID ${receiverId} not found`);
        }
    });
    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log("User removed");
        io.emit("getUsers", users);
    });
});
io.listen(3000);
