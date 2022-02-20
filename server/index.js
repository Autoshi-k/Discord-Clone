import express from 'express';


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
const app = express();
dotenv.config();

// MiddleWares
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/delfriends', async (req, res) => {
  await db.query('DELETE FROM friends');
  res.send('kill me');
})

// route middlewares
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/users', findUsersRouter);

// Socket IO
const server = createServer(app);
const io = new Server(server);

let connected = [];
io.on("connection", async socket => {
  connected.push({ sid: socket.id, uid: socket.handshake.auth.userId })

  console.log(socket.id, socket.handshake.auth.userId);
  socket.on('add friend', async ({senderId, name, tag}) => {
    console.log('add friend', socket.id)
    const selectQuery = `SELECT id, name, tag, avatar, statusId FROM users WHERE name = '${name}' AND tag = '${tag}' LIMIT 1`;
    const [addFriend] = await db.query(selectQuery);
    // if (!addFriend.length) return res.send({ success: false, err: 'user is not found' });
    const addFriendQuery = 
     `INSERT INTO pending_requests (userId, relatedUserId, direction) 
      VALUES (?, ?, ?), (?, ?, ?)`;
    const rows = await db.query(addFriendQuery, [senderId, addFriend[0].id, 'outgoing', addFriend[0].id, senderId, 'incoming']);
    const to = connected.find(connectedUser => connectedUser.uid === addFriend[0].id);
    console.log(rows);
    const request = {
      direction: 'outgoing',
      ...addFriend[0]
    }
    socket.emit('pending request', { request });
    console.log('add friend');
  })

  socket.on('remove friend request', async ({ requestId }) => {
    const deleteRequest = 
     `DELETE FROM pending_requests 
      WHERE userId = ${requestId[0]} AND relatedUserId = ${requestId[1]} 
      OR userId = ${requestId[1]} AND relatedUserId = ${requestId[0]} LIMIT 2`;
    await db.query(deleteRequest);
    socket.emit('removed friend request', { requestId });
    console.log('remove request friend');
  })

  socket.on('accept friend request', async ({ requestId }) => {
    // requestID -> [sender id, reciver id]
    const selectQuery = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = '${requestId[1]}'LIMIT 1`;
    const [addFriend] = await db.query(selectQuery);
    const insertFriend = 'INSERT INTO friends (userId, friendId) VALUES (?, ?), (?, ?)'
    await db.query(insertFriend, [requestId[0], requestId[1], requestId[1], requestId[0]]);
    console.log('socket emit');
    socket.emit('friend added', { friendAdded: addFriend[0] });
  })

  socket.on('add chat', async ({ type, user, friend }) => {
    // type: 0 = mixed, 1 = chatonly, 2 = voiceonly
    const createRoom = 'INSERT INTO rooms (type) VALUES (?)';
    const [room] = await db.query(createRoom, [type]);
    const addUsers = `INSERT INTO rooms_traffic (roomId, userId) VALUES (?, ?), (?, ?)`;
    await db.query(addUsers, [room.insertId, user.id, room.insertId, friend.id]);
    socket.join(room.insertId);
    // socket.emit('chat added', { roomId: room.insertId, friend });
    socket.emit('chat added', { roomId: room.insertId, friend });
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