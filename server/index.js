import express from 'express';
import dotenv from 'dotenv';
import formData from 'express-form-data';

// import multer from 'multer';

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
app.use(formData.union());

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
  // console.log(socket);
  console.log(socket.id);
  console.log(connected);

  
  const selectRoomIds = `SELECT roomId FROM rooms_traffic WHERE rooms_traffic.userId = ${user}`;
  let [roomIdsRow] = await db.query(selectRoomIds);
  roomIdsRow.forEach(room => socket.join(room.roomId));
  // console.log(socket);
  
  socket.on('add friend', async ({ name, tag}) => {
    const selectQuery = `SELECT id, name, tag, avatar, statusId FROM users WHERE name = '${name}' AND tag = '${tag}' LIMIT 1`;
    const [friendRow] = await db.query(selectQuery);
    const reqId = friendRow[0].id;
    // if (!addFriend.length) return res.send({ success: false, err: 'user is not found' });
    const addFriendQuery = 
     `INSERT INTO pending_requests (userId, relatedUserId, direction) 
      VALUES (?, ?, ?), (?, ?, ?)`;
    const rows = await db.query(addFriendQuery, [user, reqId, 'outgoing', reqId, user, 'incoming']);
    
    const request = {
      direction: 'outgoing',
      ...friendRow[0]
    }
    console.log('request emit');
    socket.emit('pending request', { request });
    const req = connected.find(connectedUser => connectedUser.uid === reqId);
    if (req) socket.to(req.sid).emit('pending request', { request });
  })

  socket.on('remove friend request', async ({ reqId }) => {
    const deleteRequest = 
    `DELETE FROM pending_requests 
    WHERE userId = ${user} AND relatedUserId = ${reqId} 
    OR userId = ${reqId} AND relatedUserId = ${user} LIMIT 2`;
    await db.query(deleteRequest);
    console.log('emit');
    socket.emit('removed friend request', { id: user, otherId: reqId });
    const req = connected.find(connectedUser => connectedUser.uid === reqId);
    if (req) socket.to(req.sid).emit('removed friend request', { id: user, otherId: reqId });
  })

  socket.on('accept friend request', async ({ reqId }) => {
    const selectQuery = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = '${reqId}' OR id = '${user}'LIMIT 2`;
    const [friendRow] = await db.query(selectQuery);
    const insertFriend = 'INSERT INTO friends (userId, friendId) VALUES (?, ?), (?, ?)'
    await db.query(insertFriend, [user, reqId, reqId, user]);
    const sendTo = {};
    if (friendRow[0].id === user) {
      sendTo['user'] = friendRow[1];
      sendTo['req'] = friendRow[0];
    } else {
      sendTo['user'] = friendRow[0];
      sendTo['req'] = friendRow[1];
    }
    socket.emit('friend added', { friendAdded: sendTo.user });
    const req = connected.find(connectedUser => connectedUser.uid === reqId)
    if (req) socket.to(req.sid).emit('friend added', { friendAdded: sendTo.req });
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
    const updateRoom = `UPDATE rooms_traffic SET lastVisited = CURRENT_TIMESTAMP WHERE roomId = ${room} AND userId = ${user}`;
    await db.query(updateRoom);
  })

  socket.on('send message', async ({message, to}) => {
    // find room
    const selectRoom = `SELECT id FROM rooms WHERE id = ${to} LIMIT 1`;
    const [roomId] = await db.query(selectRoom);
    // create new message
    const insertMessage = `INSERT INTO messages (userId, roomId, content) VALUES (?, ?, ?)`;
    const [checkOutput] = await db.query(insertMessage, [user, roomId[0].id, message]);
    const selectMessage = `SELECT userId, created, content, type FROM messages WHERE id = ${checkOutput.insertId}`;
    const [messageRow] = await db.query(selectMessage);
    io.in(to).emit('message sent', { message: messageRow[0] });
  })

  socket.on('disconnect', async () => {
    const index = connected.find(connectedUser => connectedUser.uid === user);
    connected.splice(index, 1);
  });
});

server.listen(3001, (err) => console.log(err ? err : 'IS OKE'));