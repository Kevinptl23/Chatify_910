import { Server } from "socket.io";

const userSocketMap = {};

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected to the server is ", socket.id);

    const userId = socket.handshake.query.userId;
    console.log(userId, "This is my id..");

    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user is disconnected ", socket.io);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io };
