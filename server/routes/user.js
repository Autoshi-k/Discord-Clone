import express, { request } from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import db from '../connection.js';

export const router = express.Router();

// is the first stop after logging in
// or when user already logged in and directed to channels

router.get('/', verify, async (req, res) => {

  const selectUser = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = ${req.user.id}`
  const [userRows] = await db.query(selectUser);
  
  const selectPending = `SELECT pending_requests.senderId, users.id, users.name, users.tag, users.avatar, users.statusId 
                         FROM pending_requests 
                         RIGHT JOIN users 
                         ON users.id = pending_requests.reciverId
                         WHERE pending_requests.senderId = ${userRows[0].id} OR pending_requests.reciverId = ${userRows[0].id}`;
  const [pendingRows] = await db.query(selectPending);
  const pending = pendingRows.map(request => { 
    return {...request, status: request.senderId === userRows[0].id ? 'outgoing' : 'incoming' }
  })
  res.send({ user: userRows[0], objRooms: { }, pending });


  // needs to get all friends, chats and pending 
})
