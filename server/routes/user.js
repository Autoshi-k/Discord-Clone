import express from 'express';
import { auth as verify } from '../utilities/tokenVerify.js';
import db from '../connection.js';
import { uploadAvatar } from '../utilities/s3.js';
import multer from 'multer';
import path from 'path';
import uniqid from 'uniqid';
import { comparePasswords, hashPassword } from '../utilities/hash.js';
import { getUserById } from '../utilities/user.js';

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
  const user = await getUserById(req.user.id);

  // get rooms
  const selectRoomIds = `SELECT roomId FROM rooms_traffic WHERE rooms_traffic.userId = ${user.id}`;
  let [roomIdsRow] = await db.query(selectRoomIds);
  const roomIds = roomIdsRow.map(room => room.roomId);
  const selectRooms = 
   `SELECT rooms_traffic.roomId, rooms_traffic.lastVisited, users.id, users.name, users.tag, users.avatar, users.statusId
    FROM rooms_traffic
    LEFT JOIN users 
    ON rooms_traffic.userId = users.id
    WHERE rooms_traffic.roomId IN (${roomIds}) AND rooms_traffic.userId != ${user.id}
    `
  const roomsRow = await getRooms(roomIds, selectRooms)
  // let [roomsRow] = roomIds.lenght ? await db.query(selectRooms) : null;

  const selectFriends = 
   `SELECT temp.friendId, temp.confirmed, temp.initiateBy, users.id, users.name, users.tag, users.avatar, users.statusId
    FROM users
    INNER JOIN (SELECT aa.friendId, aa.confirmed, aa.userId1 AS initiateBy, aa.userId2 AS uid
    FROM friends as aa
    WHERE aa.userId1 = ${user.id}
    UNION
    SELECT aa.friendId, aa.confirmed, aa.userId1 AS initiateBy, aa.userId1 AS uid
    FROM friends AS aa
    WHERE aa.userId2 = ${user.id}) AS temp
    ON users.id = temp.uid`;
  
  const [friendsRow] = await db.query(selectFriends);
  // console.log(test)


  res.send({ 
    user: user,
    rooms: roomsRow,
    connections: friendsRow
  });
  // needs to get all friends, chats and pending 
})

router.put('/update', async (req, res) => {
  console.log('req', req.body);
  await uploadAvatar(req.body);
})

router.post('/updateProfile', verify, upload.single('image'), async (req, res) => {
  let query = [];
  let avatarSrc;
  const user = await getUserById(req.user.id);
  const body = req.body;

  if (req.file) {
    avatarSrc = await uploadAvatar(req.file);
    query.push(`avatar = '${avatarSrc.Location}'`);
  } 
  
  if (body.color) query.push(`color = '${body.color}'`);

  const updateUser = 
   `UPDATE users 
    SET ${ query.join(', ') } WHERE id = ${user.id} LIMIT 1`;
  const test = await db.query(updateUser);
  res.send({ seccuss: true });
})




router.post('/updateAccount', verify, async (req, res) => {
  let setColumn, newValue;
  const user = await getUserById(req.user.id, true);
  const body = req.body;

  const isMatch = await comparePasswords(body.password, user.password);
  if (!isMatch) return res.status(400).send({ failed: 'password does not match' })

  const column = Object.keys(body).filter(key => !['password', 'confirm'].includes(key)) 
  if (column[0] === 'newPassword') {
    setColumn = 'password';
    newValue = await hashPassword(body.newPassword);
  } else {
    setColumn = column[0];
    newValue = body[column[0]];
  }
  
  const updateUser = 
   `UPDATE users SET ${setColumn} = '${newValue}' WHERE id = ${user.id} LIMIT 1`;
  await db.query(updateUser);
  res.send({ seccuss: true });
})