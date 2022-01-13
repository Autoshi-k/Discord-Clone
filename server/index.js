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

io.on("connection", (socket) => {
  console.log("New client connected");

  // socket.on('newMsg', message => {
  //   io.emit('message', {
  //     text: message,
  //     date: new Date().toISOString(),
  //   })
  // })

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

// app.use(session({
//   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//   saveUninitialized: true,
//   cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   resave: false
// }));


// io.on('connection', (socket) => {
//   console.log('a user connected');
//   // console.log(socket);
//   socket["userId"] = reqSessionId;
//   console.log(socket);
//   console.log(reqSessionId);

//   socket.on('chat message', (msg) => {
//     // io.emit('message: ' + msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

// });

// mongoose.connect('mongodb://localhost:27017/discordDB');
// app.use('/', auth);

// app.listen(3001, () => console.log('server running on port 3001'));
server.listen(3001, (err) => console.log(err ? err : 'IS OKE'));