import { Server } from "socket.io";

interface User {
  userId: string;
  socketId: string;
}

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let users: User[] = [];

const addUser = (userId: string, socketId: string) => {
  !users.some((user: User) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user: User) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  const result = users.find((user: any) => user.userId === userId);
  return result;
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    const userSocketId = user?.socketId as string;
    io.to(userSocketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

io.listen(3000);
