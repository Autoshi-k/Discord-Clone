import express from 'express';


import dotenv from 'dotenv';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';

// Import routes
import { router as authRouter } from './routes/auth.js';
import { router as userRouter } from './routes/user.js';
import { router as messagesRouter } from './routes/messages.js';

import db from './connection.js';
const app = express();
dotenv.config();

// MiddleWares
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/delfriends', async (req, res) => {
  await db.query('DELETE FROM messages');
  res.send('kill me');
})

// route middlewares
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/messages', messagesRouter);

// Socket IO
const server = createServer(app);
const io = new Server(server);

let connected = [];
io.on("connection", async socket => {
  const user = socket.handshake.auth.userId;
  connected.push({ sid: socket.id, uid: user })
  console.log(socket);
  
  const selectRoomIds = `SELECT roomId FROM rooms_traffic WHERE rooms_traffic.userId = ${user}`;
  let [roomIdsRow] = await db.query(selectRoomIds);
  const roomIds = roomIdsRow.map(room => room.roomId);
  socket.join(roomIds);
  console.log(socket);
  
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

  socket.on('update last visit', async ({ room }) => {
    // find room and update last time visited
    const updateRoom = `UPDATE rooms_traffic SET lastVisited = CURRENT_TIMESTAMP WHERE roomId = ${room}`;
    await db.query(updateRoom);
  })

  socket.on('send message', async ({message, to}) => {
    console.log('send message to: ', to);
    // find room
    const selectRoom = `SELECT id FROM rooms WHERE id = ${to} LIMIT 1`;
    const [roomId] = await db.query(selectRoom);
    // create new message
    const insertMessage = `INSERT INTO messages (userId, roomId, content) VALUES (?, ?, ?)`;
    const [checkOutput] = await db.query(insertMessage, [user, roomId[0].id, message]);
    const selectMessage = `SELECT userId, created, content, type FROM messages WHERE id = ${checkOutput.insertId}`;
    const [messageRow] = await db.query(selectMessage);
    socket.emit('message sent', { message: messageRow[0] });
    // socket.to(to).emit('message sent', { message: messageRow[0] });
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