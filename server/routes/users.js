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
  console.log(name, tag);
  const selectQuery = `SELECT id, name, tag FROM users WHERE name = '${name}' AND tag = '${tag}' LIMIT 1`;
  db.query(selectQuery, 
          (err, result) => {
            if (err) console.log(err);
            console.log(result);
            if (result.length) {
              const addFriendQuery = `INSERT INTO friends (first_userid, second_userid, status) VALUES (?, ?, ?)`;
              db.query(addFriendQuery, 
                      [userId, result.id, 'pending'], 
                      (err) => { 
                        if (err) console.log(err);
                        return res.send({ success: true, user: result[0] });
                      });
            } else return res.send({ err: 'user doesnt exist' });
          })
})