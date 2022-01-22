import express from 'express';
const app = express();

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import session from 'express-session';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http, { createServer } from 'http';

// Import routes
import { router as authRouter } from './routes/auth.js';
import { router as channelsRouter } from './routes/channels.js';
import { router as findUsersRouter } from './routes/users.js';
import { connect } from 'http2';
import Message from './models/Message.js';
import PrivateRoom from './models/PrivateRooms.js';
import Connected from './models/Connected.js';

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


app.get('/', (req, res) => {
  res.send('test test')
})


// Socket IO
const server = createServer(app);
const io = new Server(server);

let connectedUsers = [];
io.on("connection", socket => {

  connectedUsers.push({
    socketId: socket.id,
    userId: socket.handshake.auth.userId
  })
  // can use connection to update user status

  socket.on('try send new message', async ({ msg, to, reciver }) => {
    // now to is an onj (roomId, userId)
    // to is privateRoom id , privateRoom include user id
    let toSocketId;
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
      const userIdToSocketId = room.participants.find(participant => participant.id === reciver).id;
      toSocketId = connectedUsers.find(user => user.userId === userIdToSocketId).socketId;
      // socket.to(toSocketId).emit('success send new message', { newMessage, toSocketId });
      // socket.emit('test', toSocketId);
    } catch (err) {
      console.log(err);
    }
    socket.broadcast.emit('test', { newMessage, toSocketId });
  })
  
  socket.on('disconnect', () => {
    const index = connectedUsers.findIndex(user => { console.log(user); return user.socketID === socket.id})
    connectedUsers.splice(index, 1);
  });
});

server.listen(3001, (err) => console.log(err ? err : 'IS OKE'));