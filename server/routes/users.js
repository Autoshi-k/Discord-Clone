import express from 'express';
import { auth as verify } from '../helper/tokenVerify.js';
import Participant from '../models/Participant.js';
import Room from '../models/Room.js';
import User from '../models/User.js';

export const router = express.Router();

// in this file you can find:
// find all users (not really needed tbh),
// add new conversation with user
// get all history chat with user

router.get('/', verify, async (req, res) => {
  // const user = await User.find({ id: req.user.id });
  // get all users in DB, only username & tag
  const allUsers = await User.find().select('id displayName tag');
  res.send(allUsers);
})

router.post('/addConv', verify, async (req, res) => {
  // user who made the request
  // const user = await User.findOne({ id: req.user.id });
  const { displayName, tag } = req.body;
  
  console.log('me', req.user.id, 'other', displayName);
  // user to add to { rooms: private }
  const addUser = await User.findOne({ displayName: displayName });
  if (!addUser) return res.send({ err: 'user doesnt exist' });
  
  // creating new room
  let newRoom;
  try {
    newRoom = new Room({ host: req.user.id });
    // creating new participants
    const participantHost = new Participant({ roomId: newRoom._id, userId: req.user.id });
    const participantAdd = new Participant({ roomId: newRoom._id, userId: addUser._id });
    await newRoom.save();
    await participantHost.save();
    await participantAdd.save();
    
  } catch (err) {
    console.log(err);
  }
  
  
  // update new converstion -- need to check if id alreay exist
  // or if its the same as user id (user adding himself)
  // ALSO need to add conversation in the other user !IMPORTANT
  // user.conversations.push({ id: addUser.id, displayName: addUser.displayName, tag: addUser.tag });
  // await user.save();
  console.log(newRoom)
  res.status(200).send(newRoom._id);
})