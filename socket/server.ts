import { Server } from "socket.io";

interface User {
  userId: string;
  socketId: string;
}

const io = new Server({
  cors: {
    // origin: "https://bright-route.online",
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let users: User[] = [];

const addUser = (userId: string, socketId: string) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("Socket Connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("typing", (value) => {
    const socketIdOne = getUser(value);
    if (socketIdOne) {
      socket.to([socketIdOne?.socketId]).emit("getTyping");
    }
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(message?.receiverId);
    if (user && message) {
      const { socketId } = user;
      io.to(socketId).emit("getMessage", message);
    } else {
      console.error(`User with ID ${message?.receiverId} not found`);
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
    } else {
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
