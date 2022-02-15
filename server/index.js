import express from 'express';
const app = express();

import dotenv from 'dotenv';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';

// Import routes
import { router as authRouter } from './routes/auth.js';
import { router as userRouter } from './routes/user.js';
import { router as findUsersRouter } from './routes/users.js';

import db from './connection.js';

dotenv.config();

// MiddleWares
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// route middlewares
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/users', findUsersRouter);

// Socket IO
const server = createServer(app);
const io = new Server(server);

let connected = [];
io.on("connection", async socket => {
  connected.push({ sid: socket.id, uid: socket.handshake.auth })
  // // at connection getting information about the user
  // // and joining all the relevate rooms
  // // const user = await User.findById(socket.handshake.auth.userId);
  // // const RoomsAsObj = await Participant.find({ userId: socket.handshake.auth.userId })
  // // let rooms = RoomsAsObj.map(room => room.roomId);
  // // socket.join(rooms);

  socket.on('add friend', async ({senderId, name, tag}) => {
    console.log('add friend')
    const selectQuery = `SELECT id, name, tag, avatar FROM users WHERE name = '${name}' AND tag = '${tag}' LIMIT 1`;
    const [addFriend] = await db.query(selectQuery);
    if (!addFriend.length) return res.send({ success: false, err: 'user is not found' });
    const addFriendQuery = `INSERT INTO pending_requests (userId, relatedUserId, direction) 
                            VALUES (?, ?, ?), (?, ?, ?)`;
    const [rows] = await db.query(addFriendQuery, [senderId, addFriend[0].id, 'outgoing', addFriend[0].id, senderId, 'incoming']);
    const to = connected.find(connectedUser => connectedUser.uid === addFriend[0].id);
    socket.to(socket.id).emit('pending request', rows[0]);
    socket.to(to).emit('pending request', rows[1]);
  })

  socket.on('ignore friend request', async ({ requestsId }) => {
    const deleteRequest = `DELETE FROM pending_requests WHERE id = ${requestsId[0]} OR id = ${requestsId[1]} LIMIT 2`;
    await db.query(deleteRequest);
    socket.emit('ignored friend request', { requestsId });
  })

  socket.on('accept friend request', async ({ senderId, reciverId }) => {
    const deleteRequest = `DELETE FROM pending_requests WHERE senderId = ${senderId} AND reciverId = ${reciverId} LIMIT 1`;
    await db.query(deleteRequest);
    const insertFriend = `INSERT INTO friends (firstUserId, secondUserId), (firstUserId, secondUserId) VALUES (?, ?), (?, ?)
                          SELECT id, name, tag, avatar, statusId FROM users WHERE id = ${senderId} LIMIT 1`;
    const friendAdd = await db.query(insertFriend, [senderId, reciverId, reciverId, senderId]);
    console.log('socket emit');
    socket.emit('accepted friend request', { senderId, reciverId, friendAdd });
  })

  // socket.on('disconnect', async () => {
  //   // user.currentStatus = 0; // still havnt decide if idle or disconnected
  //   // try {
  //   //   await user.save();
  //   // } catch (err) { console.log(err) }

  //   // this thing up here is messing up my code
  //   // need to make it a normal on/emit
  // });
});

server.listen(3001, (err) => console.log(err ? err : 'IS OKE'));