// import { app } from './index.js';
// import db from './connection.js';
// import {io} from './index.js';

// // const server = createServer(app);
// // const io = new Server(server);

// let connected = [];
// io.on("connection", async socket => {
//   if (!socket.handshake.auth.userId) return; 
//   const userId = socket.handshake.auth.userId;
//   connected.push({ sid: socket.id, uid: userId })
//   console.log('userId', userId);


//   const selectRoomIds = `SELECT roomId FROM rooms_traffic WHERE rooms_traffic.userId = ${userId}`;
//   let [roomIdsRow] = await db.query(selectRoomIds);
//   roomIdsRow.forEach(room => socket.join(room.roomId));
//   // console.log(socket);
  
//   socket.on('add friend', async ({ id, name, tag}) => {
//     const findUser = 
//      `SELECT id, name, tag, avatar, statusId 
//       FROM users 
//       WHERE name = '${name}' AND tag = '${tag}'
//       LIMIT 1`;
//     const [friendRow] = await db.query(findUser);
//     // in case user is not found
//     if (!friendRow.length) {
//       socket.emit('add friend failed', { 
//         error: 'user not found', 
//         message: 'Hm, didn\'nt work. Double check the capitalization, spelling, any spaces, and numbers are corret.' 
//       });
//       return;
//     }
//     const user2 = friendRow[0];

//     const findFriendExist = 
//      `SELECT friendId
//       FROM friends
//       WHERE friends.userId1 = ${id} AND friends.userId2 = ${user2.id}
//       OR friends.userId1 = ${user2.id} AND friends.userId2 = ${id}`;
//     const [friendExist] = await db.query(findFriendExist);
//     if (friendExist.length) {
//       socket.emit('add friend failed', { 
//         error: 'friend request failed',
//         message: 'you\'re already friends with that user!' 
//       });
//       return;
//     }
//     const findMyself = 
//      `SELECT id, name, tag, avatar, statusId 
//       FROM users 
//       WHERE id = ${id}
//       LIMIT 1`;
//     const [myselfRow] = await db.query(findMyself);
//     const user1 = myselfRow[0];
//     const addFriend = 
//      `INSERT INTO friends (userId1, userId2)
//       VALUES (?, ?)`;
//     const [response] = await db.query(addFriend, [user1.id, user2.id]);
//     const request = {
//       friendId: response.insertId,
//       confirmed: 0,
//       initiateBy: user1.id,
//     }
//     if (response.serverStatus === 2) {
//       socket.emit('pending request', { 
//         ...request,
//         ...user2
//       });
//       // in case user2 is conncted
//       const user2Connected = connected.find(connectedUser => connectedUser.uid === user2.id);
//       if (user2Connected) socket.to(user2Connected.sid).emit('pending request', { 
//         ...request,
//         ...user1
//       });
//     } else socket.emit('add friend failed');
//   })

//   socket.on('remove friend request', async ({ friendId, friendUserId }) => {
//     const deleteRequest = 
//      `DELETE FROM friends
//       WHERE friendId = ${friendId}
//       LIMIT 1`;
//     const [response] = await db.query(deleteRequest);
//     socket.emit('removed friend request', { friendId });
//     const friendConnected = connected.find(connectedUser => connectedUser.uid === friendUserId);
//     if (friendConnected) socket.to(friendConnected.sid).emit('removed friend request', { friendId });
//   })

//   socket.on('accept friend request', async ({ id, friendId, friendUserId }) => {
//     const updateQuery = `UPDATE friends SET confirmed = 1 WHERE friendId = ${friendId} LIMIT 1`;
//     const [response] = await db.query(updateQuery);
//     // create a room for friends
//     const createRoom = 'INSERT INTO rooms (type) VALUES (?)';
//     const [room] = await db.query(createRoom, 0);
//     const addUsers = `INSERT INTO rooms_traffic (roomId, userId) VALUES (?, ?), (?, ?)`;
//     await db.query(addUsers, [room.insertId, id, room.insertId, friendUserId]);

//     if (response.serverStatus !== 2) return;
//     socket.emit('friend added', { friendId });
//     const friendConnected = connected.find(connectedUser => connectedUser.uid === friendUserId)
//     if (friendConnected) socket.to(friendConnected.sid).emit('friend added', { friendId, roomId: room.insertId });
//   })

//   socket.on('add chat', async ({ id, type, userFriend }) => {
//     // type: 0 = mixed, 1 = chatonly, 2 = voiceonly
//     const createRoom = 'INSERT INTO rooms (type) VALUES (?)';
//     const [room] = await db.query(createRoom, [type]);
//     const addUsers = `INSERT INTO rooms_traffic (roomId, userId) VALUES (?, ?), (?, ?)`;
//     await db.query(addUsers, [room.insertId, id, room.insertId, userFriend.id]);
//     socket.join(room.insertId);
//     socket.emit('chat added', { roomId: room.insertId, userFriend });
//   })

//   socket.on('update last visit', async ({ id, room }) => {
//     // find room and update last time visited
//     const updateRoom = `UPDATE rooms_traffic SET lastVisited = CURRENT_TIMESTAMP WHERE roomId = ${room} AND userId = ${id}`;
//     await db.query(updateRoom);
//   })

//   socket.on('send message', async ({id, message, to}) => {
//     // find room
//     const selectRoom = `SELECT id FROM rooms WHERE id = ${to} LIMIT 1`;
//     const [roomId] = await db.query(selectRoom);
//     // create new message
//     const insertMessage = `INSERT INTO messages (userId, roomId, content) VALUES (?, ?, ?)`;
//     const [checkOutput] = await db.query(insertMessage, [id, roomId[0].id, message]);
//     const selectMessage = `SELECT userId, created, content, type FROM messages WHERE id = ${checkOutput.insertId}`;
//     const [messageRow] = await db.query(selectMessage);
//     io.in(to).emit('message sent', { message: messageRow[0] });
//   })

//   socket.on('change status', async ({id, newStatus}) => {
//     const updateStatus = `UPDATE users SET statusId = ${newStatus} WHERE id = ${id} LIMIT 1`;
//     await db.query(updateStatus);
//     socket.to(roomIdsRow).emit('change friend status', { id, newStatus });
//     socket.emit('change my status', newStatus);
//   })

//   socket.on('test', ({ id }) => {
//     console.log(id);
//     console.log(userId);
//   })

//   socket.on('disconnect', async () => {
//     const index = connected.find(connectedUser => connectedUser.uid === userId);
//     connected.splice(index, 1);
//   });
// });