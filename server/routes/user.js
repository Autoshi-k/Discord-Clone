import express, { request } from 'express';
import { auth as verify } from '../utilities/tokenVerify.js';
import db from '../connection.js';

export const router = express.Router();

// is the first stop after logging in
// or when user already logged in and directed to channels

router.get('/', verify, async (req, res) => {

  // get basic user information
  const selectUser = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = ${req.user.id}`
  const [userRows] = await db.query(selectUser);
  
  // get pending requests
  const selectPending = `SELECT pending_requests.direction, users.id, users.name, users.tag, users.avatar, users.statusId 
                         FROM pending_requests 
                         RIGHT JOIN users
                         ON users.id = pending_requests.relatedUserId
                         WHERE pending_requests.userId = ${userRows[0].id}`
  const [pendingRows] = await db.query(selectPending);
  console.log('pendingRows', pendingRows);
  const pending = pendingRows.map(request => { 
    return {...request, status: request.senderId === userRows[0].id ? 'outgoing' : 'incoming' }
  })

  // get friend list


  res.send({ user: userRows[0], objRooms: { }, pending });


  // needs to get all friends, chats and pending 
})
