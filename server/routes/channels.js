import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import Message from '../models/Message.js';
// import User from '../models/User.js';
import Participant from '../models/Participant.js';
import db from '../connection.js';

export const router = express.Router();

// the whole app in under url /channels therefor this /api/channels
// is the first stop after logging in
// getting user information is the only purpose 

router.get('/', verify, async (req, res) => {

  const selectQuery = `SELECT id, name, tag, avatar, statusId FROM users WHERE id = ${req.user.id}`
  const [userRows] = await db.query(selectQuery);
  res.send({ user: userRows[0], objRooms: { } });
  // const user = await User.findById(req.user.id)
  //                        .select('-password -updatedAt -createdAt -__v');
  // const rooms = await Participant.find({ userId: user._id }); // array
  // // create an object with sub-objects of roomId's
  // // any roomId has sub-sub-object with participants and an array for all messages
  // let objRooms = {};
  // await getRoomsData(objRooms, rooms);
  // res.send({ user, objRooms });
})
