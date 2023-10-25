import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("server connected");
  
  socket.on('beginPath', (arg) => {
    socket.broadcast.emit('beginPath', arg)
  })

  socket.on('traceLine', (arg) => {
    socket.broadcast.emit('traceLine', arg)
  })

  socket.on('changeStyles', (arg) => {
    socket.broadcast.emit('changeStyles', arg)
  })

});

httpServer.listen(8080);
