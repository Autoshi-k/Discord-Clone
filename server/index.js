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

io.on("connection", async socket => {
  
  // // at connection getting information about the user
  // // and joining all the relevate rooms
  // // const user = await User.findById(socket.handshake.auth.userId);
  // // const RoomsAsObj = await Participant.find({ userId: socket.handshake.auth.userId })
  // // let rooms = RoomsAsObj.map(room => room.roomId);
  // // socket.join(rooms);

  socket.on('add friend', async ({senderId, name, tag}) => {
    const selectQuery = `SELECT id, name, tag, avatar FROM users WHERE name = '${name}' AND tag = '${tag}' LIMIT 1`;
    const [addFriend] = await db.query(selectQuery);
    if (!addFriend.length) return res.send({ success: false, err: 'user is not found' });
    const addFriendQuery = `INSERT INTO pending_requests (senderId, reciverId) VALUES (?, ?)`;
    await db.query(addFriendQuery, [senderId, addFriend[0].id]);
    
    socket.emit('pending request', { sender: senderId, userPending: addFriend[0] });
  })

  // // user making a new conversation
  // socket.on('add room', newRoom => {
  //   rooms.push(newRoom.roomId);
  //   socket.join(newRoom);
  // })
  
  // // user change his status and update all rooms
  // socket.on('change my status', async statusNumber => {
  //   user.currentStatus = statusNumber;
  //   await user.save();
  //   socket.to(rooms).emit('user changed status', { userId: user._id, newStatus: statusNumber })
  //   // WHEN DO I NEED TO ADD .TOSTRING() ??????????? user._id ---> hjfwhr374236247
  //   // new ObjectId("jkhdfhfu38e3824")
  // })

  // socket.on('try send new message', async ({ message, to }) => {
  //   // to = roomId
  //   const participantId = await Participant.findOne({ userId: user._id.toString(), roomId: to }).select('_id');
  //   const newMessage = new Message({
  //     participantId: participantId._id.toString(),
  //     content: message
  //     });
  //   try {
  //     await newMessage.save();
  //   } catch (err) { console.log(err) }

  //   socket.to(to).emit('success send new message', { roomId: to, newMessage });
  // })
  
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