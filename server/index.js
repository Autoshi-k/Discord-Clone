import express from 'express';
const app = express();

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';

// Import routes
import { router as authRouter } from './routes/auth.js';
import { router as channelsRouter } from './routes/channels.js';
import { router as findUsersRouter } from './routes/users.js';
import Message from './models/Message.js';
import Participant from './models/Participant.js';

dotenv.config();

// Connect to DB
mongoose.connect('mongodb://localhost:27017/discordDB', () => console.log('connected to DB!'));

// MiddleWares
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route middlewares
app.use('/api/user', authRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/users', findUsersRouter);




// Socket IO
const server = createServer(app);
const io = new Server(server);

let connectedUsers = [];
io.on("connection", async socket => {

  connectedUsers.push({
    socketId: socket.id,
    userId: socket.handshake.auth.userId
  })

  // // can use connection to update user status
  // const userRooms = await User.findOne({ id: socket.handshake.auth.userId }).select('displayName rooms');
  const rooms = await Participant.find({ userId: socket.handshake.auth.userId })
  rooms.forEach(room => socket.join(room.roomId)) // maybe ill need .toString()
  socket.on('add private room', newRoomId => {
    socket.join(newRoomId);
  })

  socket.on('try send new message', async ({ message, to }) => {
    // to = roomId
    // to is privateRoom id , privateRoom include user id
    console.log(message);
    const participantId = await Participant.findOne({ userId: socket.handshake.auth.userId, roomId: to }).select('_id');
    const newMessage = new Message({
      participantId: participantId._id.toString(),
      content: message
      });
    try {
      await newMessage.save();
    } catch (err) {
      console.log(err);
    }
    socket.to(to).emit('success send new message', { newMessage });
  })
  
  socket.on('disconnect', () => {
    const index = connectedUsers.findIndex(user => user.socketID === socket.id)
    connectedUsers.splice(index, 1);
  });
});

server.listen(3001, (err) => console.log(err ? err : 'IS OKE'));