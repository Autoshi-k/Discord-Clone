import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import db from '../connection.js';

export const router = express.Router();

// in this file you can find:
// find all users (not really needed tbh),
// add new conversation with user
// get all history chat with user

router.post('/addFriend', verify, async (req, res) => {
  const { name, tag } = req.body;
  const userId = req.user.id;
  
  const selectQuery = `SELECT id, name, tag FROM users WHERE name = '${name}' AND tag = '${tag}' LIMIT 1`;
  const [addFriend] = await db.query(selectQuery);
  if (!addFriend.length) return res.send({ success: false, err: 'user is not found' });
  
  const addFriendQuery = `INSERT INTO pending_request (senderId, reciverId) VALUES (?, ?)`;
  await db.query(addFriendQuery, [userId, addFriend[0].id]);
  res.send({ success: true, userPending:  addFriend[0] });

})