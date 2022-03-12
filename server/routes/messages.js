import express from 'express';
import { auth as verify } from '../utilities/tokenVerify.js';
import db from '../connection.js';

export const router = express.Router();


router.get('/getMessages/:id', verify, async (req, res) => {
  const { id } = req.params;
  // const userId = req.user.id;
  const selectParticipants = 
   `SELECT users.id, users.name, users.avatar, users.tag, users.color
    FROM rooms_traffic
    RIGHT JOIN users
    ON rooms_traffic.userId = users.id
    WHERE rooms_traffic.roomId = ${id}`;
  const [participantsRow] = await db.query(selectParticipants);
  const selectMessages = `SELECT userId, created, content, type FROM messages WHERE roomId = ${id} ORDER BY created DESC LIMIT 20 `;
  const [messagesRow] = await db.query(selectMessages);

  res.send({ usersInRoom: participantsRow, messages:  messagesRow });

})