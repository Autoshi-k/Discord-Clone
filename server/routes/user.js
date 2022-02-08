import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import db from '../connection.js';

export const router = express.Router();

// the whole app in under url /channels therefor this /api/channels
// is the first stop after logging in
// getting user information is the only purpose 

router.get('/', verify, async (req, res) => {

  const selectQuery = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = ${req.user.id}`
  const [userRows] = await db.query(selectQuery);
  res.send({ user: userRows[0], objRooms: { } });

  // needs to get all friends, chats and pending 
})
