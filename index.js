const { connection } = require("./database/connection");
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors')

console.log("Pilot backend with web socket api started");

const uri = process.env.MONGO_URI || "mongodb+srv://joserodrigolopez:xK22YDi1adZJdw25@mongodbdeployed.nr8iyxd.mongodb.net/pilot";

connection(uri);

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())

const UserRoutes = require("./routes/userRoutes");
app.use("/api/users", UserRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
      credentials: true,
    },
});

const userRequests = require('./socketRequests/requests');
userRequests(io);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
