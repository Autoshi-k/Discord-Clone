import express from 'express';
import { auth as verify } from '../utilities/tokenVerify.js';
import db from '../connection.js';
import { uploadAvatar } from '../utilities/s3.js';
import multer from 'multer';
import path from 'path';
import uniqid from 'uniqid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../temp'),
  filename: (req, file, cb) => cb(null, uniqid() + path.extname(file.originalname))
})
const upload = multer({ storage });

export const router = express.Router();

// is the first stop after logging in
// or when user already logged in and directed to channels

const getRooms = async (roomIds, selectRooms) => {
  if (!roomIds.length) return [];
  const [response] = await db.query(selectRooms);
  return  response;
}

router.get('/', verify, async (req, res) => {

  // get basic user information
  const selectUser = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = ${req.user.id}`
  const [userRows] = await db.query(selectUser);

  // get rooms
  const selectRoomIds = `SELECT roomId FROM rooms_traffic WHERE rooms_traffic.userId = ${userRows[0].id}`;
  let [roomIdsRow] = await db.query(selectRoomIds);
  const roomIds = roomIdsRow.map(room => room.roomId);
  const selectRooms = 
   `SELECT rooms_traffic.roomId, rooms_traffic.lastVisited, users.id, users.name, users.tag, users.avatar, users.statusId
    FROM rooms_traffic
    LEFT JOIN users 
    ON rooms_traffic.userId = users.id
    WHERE rooms_traffic.roomId IN (${roomIds}) AND rooms_traffic.userId != ${userRows[0].id}
    `
  const roomsRow = await getRooms(roomIds, selectRooms)
  // let [roomsRow] = roomIds.lenght ? await db.query(selectRooms) : null;

  const selectFriends = 
   `SELECT temp.friendId, temp.confirmed, temp.initiateBy, users.id, users.name, users.tag, users.avatar, users.statusId
    FROM users
    INNER JOIN (SELECT aa.friendId, aa.confirmed, aa.userId1 AS initiateBy, aa.userId2 AS uid
    FROM friends as aa
    WHERE aa.userId1 = ${userRows[0].id}
    UNION
    SELECT aa.friendId, aa.confirmed, aa.userId1 AS initiateBy, aa.userId1 AS uid
    FROM friends AS aa
    WHERE aa.userId2 = ${userRows[0].id}) AS temp
    ON users.id = temp.uid`;
  
  const [friendsRow] = await db.query(selectFriends);
  // console.log(test)


  res.send({ 
    user: userRows[0],
    rooms: roomsRow,
    connections: friendsRow
  });
  // needs to get all friends, chats and pending 
})

router.put('/update', async (req, res) => {
  console.log('req', req.body);
  await uploadAvatar(req.body);
})

router.post('/test', upload.single('image'), async (req, res) => {
  const getUser = `SELECT name, avatar, email, password FROM users WHERE id = 1 LIMIT 1`;
  const [userRow] = await db.query(getUser);
  const user = userRow[0];
  const body = req.body;
  await uploadAvatar(req.file);
  const newAvatar = req.file ? await uploadAvatar(req.file) : undefined;
  console.log(body);
  const params = {
    name: body.name === undefined ? user.name : body.name,
    avatar: newAvatar === undefined ? user.avatar : newAvatar.Location,
    email: body.email === undefined ? user.email: body.email ,
    password: body.password === undefined ? user.password : body.password,
  }
  console.log('params', params);
  const updateUser = 
  `UPDATE users SET 
    name = '${params.name}',
    avatar = '${params.avatar}',
    email = '${params.email}',
    password = '${params.name}'
    WHERE id = 1
    `
  const test = await db.query(updateUser);
  console.log(test);
  res.send({ok: 'ok'});
})