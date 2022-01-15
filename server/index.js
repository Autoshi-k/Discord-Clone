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

io.on("connection", socket => {
  
  socket.on('try send new message', async msg => {
    try {
      const newMessage = new Message({
        content: msg.content,
        sender: {
          id: msg.senderId,
          displayName: msg.senderDisplayName,
          image: msg.senderImage,
        }
      });

     await newMessage.save();
     return io.emit('success send new message', newMessage);
    } catch (err) {
      console.log(err);
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, (err) => console.log(err ? err : 'IS OKE'));