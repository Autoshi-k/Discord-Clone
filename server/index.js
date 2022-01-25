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
import PrivateRoom from './models/Room.js';
import Connected from './models/Connected.js';
import User from './models/User.js';

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

  // can use connection to update user status
  const userRooms = await User.findOne({ id: socket.handshake.auth.userId }).select('displayName rooms');
  userRooms.rooms.private.forEach(room => socket.join(room._id.toString()))
  socket.on('add private room', newRoom => {
    socket.join(newRoom);
  })

  socket.on('try send new message', async ({ msg, to }) => {
    // to = roomId
    // to is privateRoom id , privateRoom include user id
    const newMessage = new Message({
      content: msg.content,
      sender: {
        id: msg.senderId,
        displayName: msg.senderDisplayName,
        image: msg.senderImage,
      }
    });
    try {
      const room = await PrivateRoom.findOne({ _id: to});
      room.messages.push(newMessage);
      await room.save();
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