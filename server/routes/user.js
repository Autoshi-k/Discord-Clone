import express, { request } from 'express';
import { auth as verify } from '../utilities/tokenVerify.js';
import db from '../connection.js';

export const router = express.Router();

// is the first stop after logging in
// or when user already logged in and directed to channels

const getRooms = async (roomIds, selectRooms) => {
  console.log('roomIds', roomIds);
  if (!roomIds.length) return [];
  const [response] = await db.query(selectRooms);
  return  response;
}

router.get('/', verify, async (req, res) => {

  // get basic user information
  const selectUser = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = ${req.user.id}`
  const [userRows] = await db.query(selectUser);
  
  // get pending requests
  const selectPending = 
   `SELECT pending_requests.direction, users.id, users.name, users.tag, users.avatar, users.statusId 
    FROM pending_requests 
    RIGHT JOIN users
    ON users.id = pending_requests.relatedUserId
    WHERE pending_requests.userId = ${userRows[0].id}`
  const [pendingRows] = await db.query(selectPending);
  
  // get friend list
  const selectFriends =
   `SELECT users.id, users.name, users.tag, users.avatar, users.statusId
    FROM friends
    LEFT JOIN users 
    ON users.id = friends.friendId
    WHERE friends.userId = ${userRows[0].id}`
  const [friendsRow] = await db.query(selectFriends);
  
  // get rooms
  const selectRoomIds = `SELECT roomId FROM rooms_traffic WHERE rooms_traffic.userId = ${userRows[0].id}`;
  let [roomIdsRow] = await db.query(selectRoomIds);
  const roomIds = roomIdsRow.map(room => room.roomId);
  const selectRooms = 
   `SELECT rooms_traffic.roomId, users.id, users.name, users.tag, users.avatar, users.statusId
    FROM rooms_traffic
    LEFT JOIN users 
    ON rooms_traffic.userId = users.id
    WHERE rooms_traffic.roomId IN (${roomIds}) AND rooms_traffic.userId != ${userRows[0].id}
    `
  const roomsRow = await getRooms(roomIds, selectRooms)
  // let [roomsRow] = roomIds.lenght ? await db.query(selectRooms) : null;
  console.log(roomsRow);
  res.send({ 
    user: userRows[0], 
    objRooms: { }, 
    pending: pendingRows, 
    friends: friendsRow, 
    rooms: roomsRow
  });
  // needs to get all friends, chats and pending 
})