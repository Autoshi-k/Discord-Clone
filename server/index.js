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
// import { getUserById } from './utilities/user.js';

const app = express();
dotenv.config();

// MiddleWares
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(formData.union());
const array = [50];
app.get('/delfriends', async (req, res) => {
  await db.query('DELETE FROM rooms');
  await db.query('DELETE FROM rooms_traffic');
  await db.query(`DELETE FROM friends WHERE friendId IN (${array.join()})`);
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
  const userId = socket.handshake.auth.userId;
  connected.push({ sid: socket.id, uid: userId })
  
  const selectRoomIds = `SELECT roomId FROM rooms_traffic WHERE rooms_traffic.userId = ${userId}`;
  let [roomIdsRow] = await db.query(selectRoomIds);
  roomIdsRow.forEach(room => socket.join(room.roomId));
  // console.log(socket);
  
  socket.on('add friend', async ({ name, tag}) => {
    const findUser = 
     `SELECT id, name, tag, avatar, statusId 
      FROM users 
      WHERE name = '${name}' AND tag = '${tag}'
      LIMIT 1`;
    const [friendRow] = await db.query(findUser);
    // in case user is not found
    if (!friendRow.length) {
      socket.emit('add friend failed', { 
        error: 'user not found', 
        message: 'Hm, didn\'nt work. Double check the capitalization, spelling, any spaces, and numbers are corret.' 
      });
      return;
    }
    const user2 = friendRow[0];

    const findFriendExist = 
     `SELECT friendId
      FROM friends
      WHERE friends.userId1 = ${userId} AND friends.userId2 = ${user2.id}
      OR friends.userId1 = ${user2.id} AND friends.userId2 = ${userId}`;
    const [friendExist] = await db.query(findFriendExist);
    console.log(friendExist);
    if (friendExist.length) {
      socket.emit('add friend failed', { 
        error: 'friend request failed',
        message: 'you\'re already friends with that user!' 
      });
      return;
    }
    const findMyself = 
     `SELECT id, name, tag, avatar, statusId 
      FROM users 
      WHERE id = ${userId}
      LIMIT 1`;
    const [myselfRow] = await db.query(findMyself);
    const user1 = myselfRow[0];
    const addFriend = 
     `INSERT INTO friends (userId1, userId2)
      VALUES (?, ?)`;
    const [response] = await db.query(addFriend, [user1.id, user2.id]);
    const request = {
      friendId: response.insertId,
      confirmed: 0,
      initiateBy: user1.id,
    }
    if (response.serverStatus === 2) {
      socket.emit('pending request', { 
        ...request,
        ...user2
      });
      // in case user2 is conncted
      const user2Connected = connected.find(connectedUser => connectedUser.uid === user2.id);
      if (user2Connected) socket.to(user2Connected.sid).emit('pending request', { 
        ...request,
        ...user1
      });
    } else socket.emit('add friend failed');
  })

  socket.on('remove friend request', async ({ friendId, friendUserId }) => {
    const deleteRequest = 
     `DELETE FROM friends
      WHERE friendId = ${friendId}
      LIMIT 1`;
    const [response] = await db.query(deleteRequest);
    console.log(response.serverStatus);
    socket.emit('removed friend request', { friendId });
    const friendConnected = connected.find(connectedUser => connectedUser.uid === friendUserId);
    if (friendConnected) socket.to(friendConnected.sid).emit('removed friend request', { friendId });
  })

  socket.on('accept friend request', async ({ friendId, friendUserId }) => {
    const updateQuery = `UPDATE friends SET confirmed = 1 WHERE friendId = ${friendId} LIMIT 1`;
    const [response] = await db.query(updateQuery);
    // create a room for friends
    const createRoom = 'INSERT INTO rooms (type) VALUES (?)';
    const [room] = await db.query(createRoom, 0);
    const addUsers = `INSERT INTO rooms_traffic (roomId, userId) VALUES (?, ?), (?, ?)`;
    await db.query(addUsers, [room.insertId, userId, room.insertId, friendUserId]);

    if (response.serverStatus !== 2) return;
    socket.emit('friend added', { friendId });
    const friendConnected = connected.find(connectedUser => connectedUser.uid === friendUserId)
    if (friendConnected) socket.to(friendConnected.sid).emit('friend added', { friendId, roomId: room.insertId });
  })

  socket.on('add chat', async ({ type, userFriend }) => {
    // type: 0 = mixed, 1 = chatonly, 2 = voiceonly
    const createRoom = 'INSERT INTO rooms (type) VALUES (?)';
    const [room] = await db.query(createRoom, [type]);
    const addUsers = `INSERT INTO rooms_traffic (roomId, userId) VALUES (?, ?), (?, ?)`;
    await db.query(addUsers, [room.insertId, userId, room.insertId, userFriend.id]);
    socket.join(room.insertId);
    socket.emit('chat added', { roomId: room.insertId, userFriend });
  })

  socket.on('update last visit', async ({ room }) => {
    // find room and update last time visited
    const updateRoom = `UPDATE rooms_traffic SET lastVisited = CURRENT_TIMESTAMP WHERE roomId = ${room} AND userId = ${userId}`;
    await db.query(updateRoom);
  })

  socket.on('send message', async ({message, to}) => {
    // find room
    const selectRoom = `SELECT id FROM rooms WHERE id = ${to} LIMIT 1`;
    const [roomId] = await db.query(selectRoom);
    // create new message
    const insertMessage = `INSERT INTO messages (userId, roomId, content) VALUES (?, ?, ?)`;
    const [checkOutput] = await db.query(insertMessage, [userId, roomId[0].id, message]);
    const selectMessage = `SELECT userId, created, content, type FROM messages WHERE id = ${checkOutput.insertId}`;
    const [messageRow] = await db.query(selectMessage);
    io.in(to).emit('message sent', { message: messageRow[0] });
  })

  socket.on('change status', async ({newStatus}) => {
    const updateStatus = `UPDATE users SET statusId = ${newStatus} WHERE id = ${userId} LIMIT 1`;
    await db.query(updateStatus);
    socket.to(roomIdsRow).emit('change friend status', { userId, newStatus });
    socket.emit('change my status', newStatus);
  })

  socket.on('disconnect', async () => {
    const index = connected.find(connectedUser => connectedUser.uid === userId);
    connected.splice(index, 1);
  });
});

server.listen(3001, (err) => console.log(err ? err : 'IS OKE'));